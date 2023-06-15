from .db import db, environment, SCHEMA, add_prefix_for_prod


class Highlight(db.Model):
    __tablename__ = 'highlights'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    verse_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('verses.id')), nullable=False)
    color = db.Column(db.String(50), nullable=False)

    user = db.relationship('User', back_populates='highlights')
    verse = db.relationship('Verse')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'verseId': self.verse_id,
            'color': self.color,
            'user': self.user.to_dict(),
            'verse': self.verse.to_dict()
        }

    def to_dict_no_user(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'verseId': self.verse_id,
            'color': self.color,
            'verse': self.verse.to_dict()
        }
