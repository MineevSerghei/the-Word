from .db import db, environment, SCHEMA, add_prefix_for_prod


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    plan_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('plans.id')), nullable=False)
    day = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=False)
    is_completed = db.Column(db.Boolean)

    plan = db.relationship('Plan', back_populates='tasks')

    def to_dict(self):
        return {
            'id': self.id,
            'planId': self.plan_id,
            'description': self.description,
            'isCompleted': self.is_completed
        }
