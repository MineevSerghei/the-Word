from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .plan import Plan

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    notes = db.relationship('Note', back_populates='user')
    bookmarks = db.relationship('Bookmark', back_populates='user')

    enrolled_plans = db.relationship("Plan", back_populates="enrolled_user", foreign_keys=[Plan.enrolled_user_id] )
    authored_plans = db.relationship("Plan", back_populates="author", foreign_keys=[Plan.author_id])

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):

        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'bookmarks': [bookmark.to_dict_no_user() for bookmark in self.bookmarks],
            'notes': [note.to_dict_no_user() for note in self.notes],
            'enrolledPlans': [plan.to_dict() for plan in self.enrolled_plans],
            'authoredPlans': [plan.to_dict_no_author() for plan in self.authored_plans if plan.is_template == True]
        }

    def to_dict_no_ref(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'authoredPlans': [plan.to_dict() for plan in self.enrolled_plans if plan.is_template == True]
        }
