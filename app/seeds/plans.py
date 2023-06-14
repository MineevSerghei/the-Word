from app.models import db, Plan, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

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
        template_id=None,
        start_date=None,
        image_url='https://the-word-bucket.s3.us-east-2.amazonaws.com/brett-jordan-E1por_SGvJE-unsplash.jpg',
        enrolled_user_id=None,
        tasks=template_tasks
    )
    plan_instance1 = Plan(
        author_id=1,
        name='Genesis in 5 days',
        description='Read the book of Genesis in 5 days, 5 chapters in the morning and 5 chapters in the evening each day.',
        duration=5,
        template_id=1,
        is_public=False,
        is_template=False,
        start_date=date.today(),
        image_url='https://the-word-bucket.s3.us-east-2.amazonaws.com/brett-jordan-E1por_SGvJE-unsplash.jpg',
        enrolled_user_id=1,
        tasks=task_instances
    )

    tasksStrings=["Matthew 1 to Matthew 9","Matthew 10 to Matthew 16","Matthew 17 to Matthew 23","Matthew 24 to Mark 1","Mark 2 to Mark 8","Mark 9 to Mark 13","Mark 14 to Luke 2","Luke 3 to Luke 7","Luke 8 to Luke 13","Luke 14 to Luke 20","Luke 21 to Luke 24","John 1 to John 6","John 7 to John 12","John 13 to John 20","John 21 to Acts 7","Acts 8 to Acts 14","Acts 15 to Acts 20","Acts 21 to Acts 28","Romans 1 to Romans 8","Romans 9 to 1 Corinthians 3","1 Corinthians 4 to 1 Corinthians 13","1 Corinthians 14 to 2 Corinthians 7","2 Corinthians 8 to Galatians 6","Ephesians 1 to 1 Thessalonians 2","1 Thessalonians 3 to 2 Timothy 4","Titus 1 to Hebrews 10","Hebrews 11 to 1 Peter 3","1 Peter 4 to Jude 1","Revelation 1 to Revelation 12","Revelation 13 to Revelation 22"]

    tasks30 = []

    for i in range(30):
        new_task = Task(
            description=f'Read {tasksStrings[i]}',
            is_completed=None,
            day=i+1
        )
        tasks30.append(new_task)

    plan_template2 = Plan(
        author_id=1,
        name='New Testament in 30 days',
        description='Read the whole of the New Testament in 30 days, ~5,000-7,000 words a day',
        duration=30,
        is_public=True,
        is_template=True,
        template_id=None,
        start_date=None,
        image_url='https://the-word-bucket.s3.us-east-2.amazonaws.com/yannick-pulver-FAU2NI1Uixg-unsplash.jpg',
        enrolled_user_id=None,
        tasks=tasks30
    )

    db.session.add(plan_template1)
    db.session.add(plan_instance1)
    db.session.add(plan_template2)
    db.session.commit()

def undo_plans():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.plans RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))
        db.session.execute(text("DELETE FROM plans"))

    db.session.commit()
