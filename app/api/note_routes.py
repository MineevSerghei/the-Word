from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Note, db
from app.forms import NoteForm
from datetime import datetime
from . import validation_errors_to_error_messages

note_routes = Blueprint('notes', __name__)


@note_routes.route('', methods=['POST'])
@login_required
def post_note():
    """
    Route to create a note on a specific verse
    """
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note = Note(
            note_text=form.data['noteText'],
            user=current_user,
            created_at=datetime.now(),
            verse_id=int(request.get_json()['verseId'])
        )

        db.session.add(note)
        db.session.commit()

        return note.to_dict()

    print("IS IT HERE? --> ", form.errors)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@note_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_note(id):
    """
    Route to edit a note by note id
    """

    note = Note.query.get(id)

    if not note:
        return {'errors': 'Note Not Found'}, 404

    if note.user_id != current_user.id:
        return {'errors': 'Forbidden'}, 403

    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        note.note_text = form.data['noteText']

        db.session.commit()

        return note.to_dict_no_user()


    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    """
    Route to delete a note by note id
    """

    note = Note.query.get(id)

    if not note:
        return {'errors': 'Note Not Found'}, 404

    if note.user_id != current_user.id:
        return {'errors': 'Forbidden'}, 403


    db.session.delete(note)
    db.session.commit()

    return {'message': 'Successfully Deleted'}
