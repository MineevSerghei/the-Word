from app.models import db, Highlight, environment, SCHEMA
from sqlalchemy.sql import text

def seed_highlights():

    highlight1 = Highlight(
        user_id=1,
        verse_id=10,
        color="#3a98b9"
    )

    highlight2 = Highlight(
        user_id=1,
        verse_id=20,
        color="#ffd183"
    )

    db.session.add(highlight1)
    db.session.add(highlight2)

    db.session.commit()

def undo_highlights():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.highlights RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM highlights"))

    db.session.commit()
