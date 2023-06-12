from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, NumberRange

class BookmarkForm(FlaskForm):
    number = StringField('number', validators=[DataRequired(), NumberRange(max=5, min=1, message='The bookmark number must be between 1 and 5.')])
    color = StringField('color', validators=[DataRequired(), Length(max=50, message='The bookmark color string must be 50 charaters or less.')])
