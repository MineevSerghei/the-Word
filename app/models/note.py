from .db import db, environment, SCHEMA, add_prefix_for_prod


class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    verse_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('verses.id')), nullable=False)
    note_text = db.Column(db.String(700), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)

    user = db.relationship('User', back_populates='notes')
    verse = db.relationship('Verse')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'verseId': self.verse_id,
            'noteText': self.note_text,
            'createdAt': self.created_at,
            'user': self.user.to_dict(),
            'verse': self.verse.to_dict()
        }
