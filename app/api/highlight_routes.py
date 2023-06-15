from flask import Blueprint, jsonify, session, request
from app.models import Highlight, db
from flask_login import current_user, login_required
from app.forms import HighlightForm
from . import validation_errors_to_error_messages

highlight_routes = Blueprint('highlights', __name__)

@highlight_routes.route('', methods=['POST'])
@login_required
def post_highlight():
    """
    Route to create a highlight on a specific verse
    """
    form = HighlightForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        verse_id = int(request.get_json()['verseId'])

        highlight = Highlight.query.filter(Highlight.verse_id == verse_id,
                                        Highlight.user_id == current_user.id).first()

        if highlight:

            if highlight.color == form.data['color']:
                return {'errors': 'Already highlighted with this color'}, 400

            highlight.color = form.data['color']
            db.session.commit()
            return highlight.to_dict_no_user()

        else:
            new_highlight = Highlight(
                user=current_user,
                verse_id=verse_id,
                color=form.data['color']
            )
            db.session.add(new_highlight)
            db.session.commit()
            return new_highlight.to_dict_no_user()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@highlight_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_highlight(id):
    """
    Route to delete a highlight specified by VERSE id
    """

    highlight = Highlight.query.filter(Highlight.verse_id == id).first()


    if not highlight:
        return {'errors': 'Highlight Not Found'}, 404

    if highlight.user.id != current_user.id:
         return {'errors': 'Forbidden'}, 403

    db.session.delete(highlight)
    db.session.commit()

    return {'message': 'Highlight successfully deleted'}
