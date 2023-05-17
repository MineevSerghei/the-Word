from app.models import db, Verse, Chapter, Book, environment, SCHEMA
from sqlalchemy.sql import text
from .kjv import data

def seed_books():

    books = []

    for book in data.values():
        new_book = Book(
            ordinal_number=book['ordinal_number'],
            name=book['name'],
        )
        for chapter in book['chapters'].values():
            new_chapter = Chapter(
                number=chapter['number'],
                book=new_book
            )
            for verse in chapter['verses'].values():
                new_verse = Verse(
                    number=verse['number'],
                    text=verse['text'],
                    chapter=new_chapter
                )
        books.append(new_book)

    [db.session.add(book) for book in books]

    db.session.commit()


def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.chapters RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.verses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))
        db.session.execute(text("DELETE FROM chapters"))
        db.session.execute(text("DELETE FROM verses"))

    db.session.commit()
