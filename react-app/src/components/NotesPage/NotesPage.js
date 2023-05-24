import { useSelector } from 'react-redux';
import './NotesPage.css';
import { useState } from 'react';


export default function NotesPage() {

    const [sort, setSort] = useState('newest');


    const sortNotes = notes => {

        if (sort === 'oldest') {
            return notes.toSorted((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        } else if (sort === 'newest') {
            return notes.toSorted((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        } else if (sort === 'gen-rev') {
            return notes.toSorted((a, b) => {
                if (a.verse.chapter.book.ordinalNumber !== b.verse.chapter.book.ordinalNumber) {
                    return a.verse.chapter.book.ordinalNumber - b.verse.chapter.book.ordinalNumber;
                } else if (a.verse.chapter.number !== b.verse.chapter.number) {
                    return a.verse.chapter.number - b.verse.chapter.number;
                } else if (a.verse.number !== b.verse.number) {
                    return a.verse.number - b.verse.number;
                } else {
                    return 0
                }
            })
        } else if (sort === 'rev-gen') {
            return notes.toSorted((a, b) => {
                if (a.verse.chapter.book.ordinalNumber !== b.verse.chapter.book.ordinalNumber) {
                    return b.verse.chapter.book.ordinalNumber - a.verse.chapter.book.ordinalNumber;
                } else if (a.verse.chapter.number !== b.verse.chapter.number) {
                    return b.verse.chapter.number - a.verse.chapter.number;
                } else if (a.verse.number !== b.verse.number) {
                    return b.verse.number - a.verse.number;
                } else {
                    return 0
                }
            })
        } else {
            return notes;
        }
    }


    const user = useSelector(state => state.session.user);

    return (
        <div className="plans-page-wrapper">
            <h2>Notes</h2>

            <div className='sort-option-div'>
                <span>Sort by: </span>
                <span className={sort === 'gen-rev' ? 'selected-sort sort-option' : 'sort-option'} onClick={() => setSort('gen-rev')}>Gen-Rev</span>
                <span className={sort === 'rev-gen' ? 'selected-sort sort-option' : 'sort-option'} onClick={() => setSort('rev-gen')}>Rev-Gen</span>
                <span className={sort === 'oldest' ? 'selected-sort sort-option' : 'sort-option'} onClick={() => setSort('oldest')}>Oldest</span>
                <span className={sort === 'newest' ? 'selected-sort sort-option' : 'sort-option'} onClick={() => setSort('newest')}>Newest</span>
            </div>

            {sortNotes(user.notes).map(note => {
                return (
                    <div key={note.id} className="note-div">
                        <span>{note.verse.chapter.book.name} {note.verse.chapter.number}:{note.verse.number}</span>
                        <p className="note-text">{note.noteText}</p>
                        <p className="smaller">{new Date(note.createdAt).toDateString()}</p>
                    </div>
                )
            })}
        </div>
    )
}
