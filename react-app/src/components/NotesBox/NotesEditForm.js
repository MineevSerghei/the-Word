import { useState } from "react"
import { useDispatch } from "react-redux";
import './NotesBox.css'
import { editNoteThunk } from "../../store/session";



export default function NotesEditForm({ note, setField }) {

    const [noteText, setNoteText] = useState(note.noteText);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const saveNote = async e => {


        const validationErrors = {}

        if (noteText.length <= 0) {
            validationErrors.note = 'The note cannot be empty'
        }
        if (noteText.length > 700) {
            validationErrors.note = 'The note cannot be longer than 700 characters'
        }
        if (validationErrors.note) setErrors(validationErrors)
        else {
            await dispatch(editNoteThunk(note.id, noteText))
            setField('allNotes')
        }
    }

    return (
        <>
            <h2>Edit Note</h2>

            <div>
                <button onClick={() => setField('allNotes')} >Close</button>
                <button onClick={saveNote}>Save Edit</button>
                <p>{note.verse.chapter.book.name} {note.verse.chapter.number}:{note.verse.number}</p>
                {errors.note && <p>{errors.note}</p>}
                <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                ></textarea>
            </div>
        </>
    )
}
