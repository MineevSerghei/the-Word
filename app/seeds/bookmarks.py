from app.models import db, Bookmark, environment, SCHEMA
from sqlalchemy.sql import text

def seed_bookmarks():

    bookmark1 = Bookmark(
        user_id=1,
        verse_id=1000,
        number=1,
        color="#3a98b9"
    )

    bookmark2 = Bookmark(
        user_id=1,
        verse_id=2000,
        number=2,
        color="#ffd183"
    )

    db.session.add(bookmark1)
    db.session.add(bookmark2)

    db.session.commit()

def undo_bookmarks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookmarks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookmarks"))

    db.session.commit()
