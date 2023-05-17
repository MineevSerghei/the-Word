from flask import Blueprint, jsonify, session, request
from app.models import Chapter, Book, db
from flask_login import current_user, login_required

bible_routes = Blueprint('bible', __name__)

@bible_routes.route('/<name>/<int:number>')
def get_chapter(name, number):
    """
    Get a single chapter by book name and chapter number
    """

    chapter = Chapter.query().join(Book).filter(Chapter.number == number, Book.name == name).first()

    if chapter:
        return chapter.to_dict()
    else:
        return {'errors': 'Not Found'}, 404

@bible_routes.route('/books')
def get_books():
    """
    Get a list of all the books of the Bible in order
    """

    books = Book.query.order_by(Book.ordinal_number).all()

    if books:
        return [book.to_dict() for book in books]
    else:
        return {'errors': 'Not Found'}, 404
