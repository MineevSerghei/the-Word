from app.models import db, Plan, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_plans():

    task1 = Task(
        description='Read Genesis chapters 1-5',
        is_completed=None,
        day=1
    )
    task2 = Task(
        description='Read Genesis chapters 6-10',
        is_completed=None,
        day=1
    )
    task3 = Task(
        description='Read Genesis chapters 11-15',
        is_completed=None,
        day=2
    )
    task4 = Task(
        description='Read Genesis chapters 16-20',
        is_completed=None,
        day=2
    )
    task5 = Task(
        description='Read Genesis chapters 21-25',
        is_completed=None,
        day=3
    )
    task6 = Task(
        description='Read Genesis chapters 26-30',
        is_completed=None,
        day=3
    )
    task7 = Task(
        description='Read Genesis chapters 31-35',
        is_completed=None,
        day=4
    )
    task8 = Task(
        description='Read Genesis chapters 36-40',
        is_completed=None,
        day=4
    )
    task9 = Task(
        description='Read Genesis chapters 41-45',
        is_completed=None,
        day=5
    )
    task10 = Task(
        description='Read Genesis chapters 46-50',
        is_completed=None,
        day=5
    )

    template_tasks = [task1, task2, task3, task4, task5, task6, task7, task8, task9, task10]

    task_instances = []

    for task in template_tasks:
        new_task = Task(
            description=task.description,
            is_completed=False,
            day=task.day
        )
        task_instances.append(new_task)



    plan_template1 = Plan(
        author_id=1,
        name='Genesis in 5 days',
        description='Read the book of Genesis in 5 days, 5 chapters in the morning and 5 chapters in the evening each day.',
        duration=5,
        is_public=True,
        is_template=True,
        start_date=None,
        enrolled_user_id=None,
        tasks=template_tasks
    )
    plan_instance1 = Plan(
        author_id=1,
        name='Genesis in 5 days',
        description='Read the book of Genesis in 5 days, 5 chapters in the morning and 5 chapters in the evening each day.',
        duration=5,
        is_public=False,
        is_template=False,
        start_date=datetime.now(),
        enrolled_user_id=1,
        tasks=task_instances
    )

    db.session.add(plan_template1)
    db.session.add(plan_instance1)
    db.session.commit()

def undo_plans():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.plans RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))
        db.session.execute(text("DELETE FROM plans"))

    db.session.commit()
