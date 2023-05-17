from .db import db, environment, SCHEMA, add_prefix_for_prod


class Verse(db.Model):
    __tablename__ = 'verses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, nullable=False)
    text = db.Column(db.String(700), nullable=False)
    chapter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chapters.id')), nullable=False)

    chapter = db.relationship('Chapter', back_populates='verses', lazy="joined")

    def to_dict(self):
        return {
            'id': self.id,
            'number': self.number,
            'text': self.text,
            'chapter': self.chapter.to_dict_no_verses()
        }

    def to_dict_no_chapter(self):
        return {
            'id': self.id,
            'number': self.number,
            'text': self.text,
        }
