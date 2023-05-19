from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Plan, Task, db
from datetime import datetime
from app.forms import PlanForm
from . import validation_errors_to_error_messages

plan_routes = Blueprint('plans', __name__)

@plan_routes.route('')
def get_all_plans():
    """
    Route to get all PUBLIC reading plan TEMPLATES
    """

    plans = Plan.query.filter(Plan.is_template==True and Plan.is_public==True).all()

    if not plans:
         return {'errors': 'Plans Not Found'}, 404

    return [plan.to_dict() for plan in plans]




@plan_routes.route('', methods=['POST'])
@login_required
def post_plan():
    """
    Route to create a reading plan
    """
    form = PlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    req = request.get_json()
    tasks = req['tasks']
    duration = req['duration']
    is_public = req['isPublic']


    task_errors = {}

    for task in tasks:
        if len(task.description) <= 0:
            task_errors[task.day] = 'Task description is required'
        if  len(task.description) > 500:
            task_errors[task.day] = 'Task description has to be 500 characters or less'

    if task_errors:
        return {'task_errors': task_errors}, 400

    if form.validate_on_submit():

        tasks_to_create = []

        for task in tasks:
            new_task = Task(
                description=task.description,
                is_completed=None,
                day=task.day
            )
            tasks_to_create.append(new_task)

        plan = Plan(
            author_id=current_user.id,
            name=form['name'],
            description=form['description'],
            duration=duration,
            is_public=is_public,
            is_template=True,
            start_date=None,
            enrolled_user_id=None,
            tasks=tasks_to_create
        )

        db.session.add(plan)
        db.session.commit()

        return plan.to_dict()

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

    for task in tasks:
        if len(task.description) <= 0:
            task_errors[task.day] = 'Task description is required'
        if  len(task.description) > 500:
            task_errors[task.day] = 'Task description has to be 500 characters or less'

    if task_errors:
        return {'task_errors': task_errors}, 400

    if form.validate_on_submit():

        tasks_to_create = []

        for task in tasks:
            task_to_delete = Task.query.get(task.id)
            db.session.delete(task_to_delete)

            new_task = Task(
                description=task.description,
                is_completed=None,
                day=task.day
            )
            tasks_to_create.append(new_task)

        plan_to_update.name=form['name'],
        plan_to_update.description=form['description'],
        plan_to_update.duration=duration,
        plan_to_update.is_public=is_public,
        tasks=tasks_to_create

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

    db.session.delete(plan_to_delete)
    db.session.commit()

    return {'message': 'Successfully Deleted'}
