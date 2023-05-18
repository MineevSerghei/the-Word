import { useState } from "react"
import { useDispatch } from "react-redux";
import './NotesBox.css'
import { editNoteThunk } from "../../store/session";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import OpenModalButton from "../OpenModalButton";


export default function NotesEditForm({ note, setField }) {

    const [noteText, setNoteText] = useState(note.noteText);
    const dispatch = useDispatch();

    const saveNote = async e => {

        if (note.length <= 0) {
            console.log('error')
            return
        }
        if (note.length > 700) {
            console.log('error')
            return
        }

        await dispatch(editNoteThunk(note.id, noteText))
        setField('allNotes')

    }

    return (
        <>
            <h2>Edit Note</h2>

            <div>
                <button onClick={() => setField('allNotes')} >Close</button>
                <button onClick={saveNote}>Save Edit</button>
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<ConfirmDeleteModal noteId={note.id} setField={setField} />}
                />
                <p>{note.verse.chapter.book.name} {note.verse.chapter.number}:{note.verse.number}</p>
                <textarea
                    value={noteText}
                    onChange={e => setNoteText(e.target.value)}
                ></textarea>
            </div>
        </>
    )
}
