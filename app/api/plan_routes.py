from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Plan, Task, db
from datetime import date
from app.forms import PlanForm, PlanImageForm
from . import validation_errors_to_error_messages
from .aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
import json

plan_routes = Blueprint('plans', __name__)

def delete_unused_image(plan):

            if plan.image_url:

                image_is_in_use = Plan.query.filter(
                    Plan.image_url == plan.image_url,
                    Plan.id != plan.id).first()

                if not image_is_in_use:
                    remove_file_from_s3(plan.image_url)


@plan_routes.route('/<int:id>/enroll', methods=['POST'])
def enroll_plan(id):

    """
    Route to enroll (create a personal copy of) a plan by the template's plan_id
    """

    template = Plan.query.get(id)
    if not template:
        return {'errors': 'Plan Not Found'}, 404
    if template.is_template == False:
        return {'errors': 'Not a Template'}, 400
    if template.is_public == False and template.author.id != current_user.id:
        return {'errors': 'Forbidden'}, 403

    enrolled_plans = Plan.query.filter(Plan.template_id == template.id, Plan.enrolled_user_id == current_user.id).all()

    enrolled_plans_ids = [plan.template_id for plan in enrolled_plans]

    if template.id in enrolled_plans_ids:
        return {'errors': 'You are already following this plan'}, 400

    task_instances = []

    for task in template.tasks:
        new_task = Task(
            description=task.description,
            is_completed=False,
            day=task.day
        )
        task_instances.append(new_task)

    new_plan = Plan(
        author_id=template.author_id,
        name=template.name,
        description=template.description,
        duration=template.duration,
        template_id=template.id,
        is_public=False,
        is_template=False,
        start_date=date.today(),
        image_url=template.image_url,
        enrolled_user=current_user,
        tasks=task_instances
    )

    db.session.add(new_plan)
    db.session.commit()

    return new_plan.to_dict()


@plan_routes.route('/<int:id>/unenroll', methods=['DELETE'])
def unenroll_plan(id):
    """
    Route to unenroll a plan by plan_id
    """
    plan = Plan.query.get(id)

    if not plan:
        return {'errors': 'Plan Not Found'}, 404

    if plan.enrolled_user.id != current_user.id:
        return {'errors': 'Forbidden'}, 403

    delete_unused_image(plan)

    db.session.delete(plan)
    db.session.commit()

    return {'message': 'Successfully Unenrolled'}




@plan_routes.route('')
def get_all_plans():
    """
    Route to get all PUBLIC reading plan TEMPLATES
    """

    plans = Plan.query.filter(Plan.is_template==True, Plan.is_public==True).all()

    # if not plans:
    #      return {'errors': 'Plans Not Found'}, 404

    return [plan.to_dict() for plan in plans]




@plan_routes.route('', methods=['POST'])
@login_required
def post_plan():
    """
    Route to create a reading plan
    """

    form = PlanForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    req = request.form

    tasks = json.loads(req['tasks'])
    duration = req['duration']
    is_public = True if req['isPublic'] == 'true' else False

    task_errors = {}

    for i in range(len(tasks)):
        for task in tasks[i]:
            if len(task) <= 0:
                task_errors[i+1] = 'Task description is required'
            if  len(task) > 500:
                task_errors[i+1] = 'Task description has to be 500 characters or less'

    if task_errors:
        return {'errors': task_errors}, 400

    if form.validate_on_submit():

        image = form.data["image"]

        if image:

            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return upload, 400


        tasks_to_create = []

        for i in range(len(tasks)):
            for task in tasks[i]:
                new_task = Task(
                    description=task,
                    is_completed=None,
                    day=i+1
                )
                tasks_to_create.append(new_task)

        plan = Plan(
            author_id=current_user.id,
            name=form.data['name'],
            description=form.data['description'],
            duration=duration,
            is_public=is_public,
            is_template=True,
            start_date=None,
            enrolled_user_id=None,
            tasks=tasks_to_create
        )

        if image:
            plan.image_url = upload["url"]

        db.session.add(plan)
        db.session.commit()

        return plan.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@plan_routes.route('/<int:id>/image', methods=['PUT'])
@login_required
def edit_image(id):
    """
    Route to edit the image of a reading plan
    """

    plan_to_update = Plan.query.get(id)

    if plan_to_update.author_id != current_user.id:
        return {'errors': 'Forbidden'}, 403

    form = PlanImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        delete_unused_image(plan_to_update)

        plan_to_update.image_url = upload["url"]

        db.session.commit()

        return plan_to_update.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@plan_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_plan(id):
    """
    Route to edit a reading plan
    """

    plan_to_update = Plan.query.get(id)

    if plan_to_update.author_id != current_user.id:
        return {'errors': 'Forbidden'}, 403

    form = PlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    req = request.get_json()
    tasks = req['tasks']
    duration = req['duration']
    is_public = req['isPublic']


    task_errors = {}

    for i in range(len(tasks)):
        for task in tasks[i]:
            if len(task) <= 0:
                task_errors[i+1] = 'Task description is required'
            if  len(task) > 500:
                task_errors[i+1] = 'Task description has to be 500 characters or less'

    if task_errors:
        return {'task_errors': task_errors}, 400

    if form.validate_on_submit():

        tasks_to_delete = Task.query.filter(Task.plan_id == plan_to_update.id).all()
        [db.session.delete(task_to_delete) for task_to_delete in tasks_to_delete]

        tasks_to_create = []

        for i in range(len(tasks)):
            for task in tasks[i]:
                new_task = Task(
                    description=task,
                    is_completed=None,
                    day=i+1
                )
                tasks_to_create.append(new_task)

        plan_to_update.name=form.data['name']
        plan_to_update.description=form.data['description']
        plan_to_update.duration=duration
        plan_to_update.is_public=is_public
        plan_to_update.tasks=tasks_to_create

        db.session.commit()

        return plan_to_update.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@plan_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_plan(id):
    """
    Route to delete a reading plan
    """
    plan_to_delete = Plan.query.get(id)

    if plan_to_delete.author_id != current_user.id:
        return {'errors': 'Forbidden'}, 403

    delete_unused_image(plan_to_delete)

    db.session.delete(plan_to_delete)
    db.session.commit()

    return {'message': 'Successfully Deleted'}
