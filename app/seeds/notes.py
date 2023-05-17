from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_notes():

    note1 = Note(
        user_id=1,
        verse_id=100,
        note_text="verse #100!",
        created_at=datetime.now()
    )

    note2 = Note(
        user_id=1,
        verse_id=105,
        note_text="verse #105!",
        created_at=datetime.now()
    )

    note3 = Note(
        user_id=1,
        verse_id=102,
        note_text="verse #102!",
        created_at=datetime.now()
    )

    note4 = Note(
        user_id=1,
        verse_id=120,
        note_text="verse #120!",
        created_at=datetime.now()
    )

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
