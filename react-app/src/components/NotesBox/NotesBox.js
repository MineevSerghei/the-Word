import { useSelector } from "react-redux"
import NotesForm from "./NotesForm"
import NotesEditForm from "./NotesEditForm"
import NoteDetails from "./NoteDetails"
import "./NotesBox.css"
import { useState } from "react"

export default function NotesBox({ setSelectedVerse, chapter, book, field, setField, verseNum }) {

    const user = useSelector(state => state.session.user)

    const [noteToEdit, setNoteToEdit] = useState({});

    if (!user) return <h2>Please sign in to use notes</h2>

    const renderField = e => {
        setField('createNote')
    }

    const openNoteDetails = note => {
        setNoteToEdit({ ...note })
        setField('noteDetails')
    }



    return (
        <>

            {field === 'allNotes' ? <>
                <h2>Notes</h2>

                <button className="bttn-face wider" onClick={renderField}>New Note</button>

                <div className="notes-container">
                    {user.notes.slice(0).reverse().map(note => {

                        return note.verse.chapter.id === chapter.id ?
                            <div key={note.id} className="note-div">
                                <span
                                    className="note-title"
                                    onClick={() => openNoteDetails(note)}

                                >{note.verse.chapter.book.name} {note.verse.chapter.number}:{note.verse.number}</span>
                                <p className="note-text">{note.noteText}</p>
                            </div>
                            : null
                    }
                    )}
                </div>
            </> : field === 'createNote' ? <NotesForm setSelectedVerse={setSelectedVerse} chapter={chapter} book={book} setField={setField} verseNum={verseNum} />

                : field === 'noteDetails' ? <NoteDetails note={noteToEdit} setField={setField} />

                    : <NotesEditForm note={noteToEdit} setField={setField} />

            }
        </>
    )
}
