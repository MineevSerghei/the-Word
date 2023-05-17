from .db import db, environment, SCHEMA, add_prefix_for_prod


class Chapter(db.Model):
    __tablename__ = 'chapters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), nullable=False)

    book = db.relationship('Book', back_populates='chapters')
    verses = db.relationship('Verse', back_populates='chapter')


    def to_dict(self):
        return {
            'id': self.id,
            'number': self.number,
            'book': self.book.to_dict_no_chapters(),
            'verses': [verse.to_dict_no_chapter() for verse in self.verses]
        }

    def to_dict_no_book(self):
        return {
            'id': self.id,
            'number': self.number,
            'verses': [verse.to_dict_no_chapter() for verse in self.verses]
        }

    def to_dict_no_verses_no_book(self):
        return {
            'id': self.id,
            'number': self.number,
        }

    def to_dict_no_verses(self):
        return {
            'id': self.id,
            'number': self.number,
            'book': self.book.to_dict_no_chapters()
        }
