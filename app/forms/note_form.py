from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    noteText = StringField('noteText', validators=[DataRequired(), Length(max=700, message='A note has to be 700 characters or less.')])
