from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Plan, Task, db
from datetime import datetime
from app.forms import PlanForm
from . import validation_errors_to_error_messages

plan_routes = Blueprint('plans', __name__)


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
def edit_plan():
    """
    Route to edit a reading plan
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


# @note_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_note(id):
#     """
#     Route to delete a note by note id
#     """

#     note = Note.query.get(id)

#     if not note:
#         return {'errors': 'Note Not Found'}, 404

#     if note.user_id != current_user.id:
#         return {'errors': 'Forbidden'}, 403


#     db.session.delete(note)
#     db.session.commit()

#     return {'message': 'Successfully Deleted'}
