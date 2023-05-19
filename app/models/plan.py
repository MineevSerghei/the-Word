from .db import db, environment, SCHEMA, add_prefix_for_prod

class Plan(db.Model):
    __tablename__ = 'plans'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(70), nullable=False)
    description = db.Column(db.String(700), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    is_public = db.Column(db.Boolean)
    is_template = db.Column(db.Boolean, nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('plans.id')))
    start_date = db.Column(db.DateTime)
    enrolled_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

    tasks = db.relationship('Task', back_populates='plan')
    enrolled_user = db.relationship("User", back_populates="enrolled_plans", foreign_keys=[enrolled_user_id])
    author = db.relationship("User", back_populates="authored_plans", foreign_keys=[author_id])


    def to_dict(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'name': self.name,
            'description': self.description,
            'duration': self.duration,
            'isPublic': self.is_public,
            'isTemplate': self.is_template,
            'templateId': self.template_id,
            'tasks': [task.to_dict() for task in self.tasks],
            'author': self.author.to_dict_no_ref()
        }

    def to_dict_no_author(self):
        return {
            'id': self.id,
            'authorId': self.author_id,
            'name': self.name,
            'description': self.description,
            'duration': self.duration,
            'isPublic': self.is_public,
            'isTemplate': self.is_template,
            'templateId': self.template_id,
            'tasks': [task.to_dict() for task in self.tasks]
        }
