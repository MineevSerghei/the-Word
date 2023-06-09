from flask import Blueprint, jsonify, session, request
from app.models import Bookmark, db
from flask_login import current_user, login_required
from app.forms import BookmarkForm
from . import validation_errors_to_error_messages

bookmark_routes = Blueprint('bookmarks', __name__)

@bookmark_routes.route('', methods=['POST'])
@login_required
def post_bookmark():
    """
    Route to create a bookmark on a specific verse
    """
    form = BookmarkForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        bookmark = Bookmark.query.filter(Bookmark.number == form.data['number'],
                                         Bookmark.user_id == current_user.id).first()

        if bookmark:
            bookmark.verse_id = request.get_json()['verseId']
            db.session.commit()
            return bookmark.to_dict_no_user()
        else:
            new_bookmark = Bookmark(
                user=current_user,
                verse_id=int(request.get_json()['verseId']),
                number=form.data['number'],
                color=form.data['color']
            )
            db.session.add(new_bookmark)
            db.session.commit()
            return new_bookmark.to_dict_no_user()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@bookmark_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_bookmark(id):
    """
    Route to delete a bookmark specified by id
    """

    bookmark = Bookmark.query.get(id)

    if bookmark.user.id != current_user.id:
         return {'errors': 'Forbidden'}, 403

    db.session.delete(bookmark)
    db.session.commit()

    return {'message': 'Bookmark successfully deleted'}
