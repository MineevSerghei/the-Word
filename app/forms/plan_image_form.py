
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed

class PlanImageForm(FlaskForm):
    image = FileField("Image", validators=[FileAllowed(["png", "jpg", "jpeg"])])
