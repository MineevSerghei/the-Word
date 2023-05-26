from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class BookmarkForm(FlaskForm):
    tag = StringField('tag', validators=[Length(max=20, message='The bookmark tag must be 20 charaters or less.')])
    color = StringField('color', validators=[DataRequired(), Length(max=50, message='The bookmark color string must be 50 charaters or less.')])
