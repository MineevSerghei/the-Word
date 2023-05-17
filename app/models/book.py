from .db import db, environment, SCHEMA, add_prefix_for_prod


class Book(db.Model):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    ordinal_number = db.Column(db.Integer, nullable=False)

    chapters = db.relationship('Chapter', back_populates='book', lazy='selectin')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ordinalNumber': self.ordinal_number,
            'chapters': [chapter.to_dict_no_book() for chapter in self.chapters]
        }

    def to_dict_no_chapters(self):
        return {
            'id': self.id,
            'name': self.name,
            'ordinalNumber': self.ordinal_number,
        }
