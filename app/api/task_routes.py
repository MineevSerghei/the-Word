from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Task, db

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/<int:id>', methods=['PUT'])
@login_required
def toggle_completed(id):
    """
    Route to toggle tasks completed/not completed
    """

    task = Task.query.get(id)

    if not task:
         return {'errors': 'Task Not Found'}, 404

    if task.plan.enrolled_user.id != current_user.id:
        return {'errors': 'Forbidden'}, 403

    task.is_completed = not task.is_completed

    db.session.commit()

    return task.to_dict()
