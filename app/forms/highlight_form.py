from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class HighlightForm(FlaskForm):
    color = StringField('color', validators=[DataRequired(), Length(max=50, message='The bookmark color string must be 50 charaters or less.')])
