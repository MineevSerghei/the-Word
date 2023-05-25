from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    name = StringField('name', validators=[Length(max=50, message='Name has to be 50 characters or less.')])
    email = StringField('email', validators=[DataRequired(), Email(), Length(max=255, message='Email can not exceed 255 characters.'), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(max=20, message='Password has to be 20 characters or less.')])
