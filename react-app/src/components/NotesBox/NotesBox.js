import { useSelector } from "react-redux"
import NotesForm from "./NotesForm"
import NotesEditForm from "./NotesEditForm"
import "./NotesBox.css"
import { useState } from "react"

export default function NotesBox({ chapter, book, field, setField, verseNum }) {

    const user = useSelector(state => state.session.user)

    const [noteToEdit, setNoteToEdit] = useState({});

    if (!user) return <h2>Please sign in to use notes</h2>

    const renderField = e => {
        setField('createNote')
    }

    const openEditNote = note => {
        setNoteToEdit({ ...note })
        setField('editNote')
    }

    return (
        <>
            <div className="right-top">
                <div className="right-nav-bttn">Notes</div>
                <div className="right-nav-bttn">Plans</div>
            </div>

            {field === 'allNotes' ? <>
                <h2>Notes</h2>

                <button onClick={renderField}>Create Note</button>

                <div>
                    {user.notes.map(note => {

                        return note.verse.chapter.id === chapter.id ?
                            <>
                                <span
                                    className="note-title"
                                    onClick={() => openEditNote(note)}

                                >{note.verse.chapter.book.name} {note.verse.chapter.number}:{note.verse.number}</span>
                                <p>{note.noteText}</p>
                            </>
                            : null
                    }
                    )}
                </div>
            </> : field === 'createNote' ? <NotesForm chapter={chapter} book={book} setField={setField} verseNum={verseNum} />

                : <NotesEditForm note={noteToEdit} setField={setField} />

            }
        </>
    )
}
