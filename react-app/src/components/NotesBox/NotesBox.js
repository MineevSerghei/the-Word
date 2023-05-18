import { useSelector } from "react-redux"
import NotesForm from "./NotesForm"
import "./NotesBox.css"

export default function NotesBox({ chapter, book, field, setField, verseNum }) {

    const user = useSelector(state => state.session.user)



    if (!user) return <h2>Please sign in to use notes</h2>

    const renderField = e => {
        setField('createNote')
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
                                <span>{note.verse.chapter.book.name} {note.verse.chapter.number}:{note.verse.number}</span>
                                <p>{note.noteText}</p>
                            </>
                            : null
                    }
                    )}
                </div>
            </> : <NotesForm chapter={chapter} book={book} setField={setField} verseNum={verseNum} />
            }
        </>
    )
}
