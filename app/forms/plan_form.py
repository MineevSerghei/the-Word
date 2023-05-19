
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class PlanForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(max=70, message='The plan name has to be 70 characters or less.')])
    description = StringField('description', validators=[DataRequired(), Length(max=70, message='The plan description has to be 700 characters or less.')])
    duration = IntegerField('duration', validators=[DataRequired(), NumberRange(max=1096, message='The plan duration cannot be longer than 1 year (365 days).')])
    