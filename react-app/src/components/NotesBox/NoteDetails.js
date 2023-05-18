import ConfirmDeleteModal from "./ConfirmDeleteModal";
import OpenModalButton from "../OpenModalButton";

export default function NoteDetails({ setField, note }) {

    const openEditNote = e => {
        setField('editNote')
    }

    return (
        <>
            <h2>Note</h2>

            <div>
                <button onClick={() => setField('allNotes')} >Close</button>
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<ConfirmDeleteModal noteId={note.id} setField={setField} />}
                />
                <button onClick={openEditNote} >Edit</button>
                <p>{note.verse.chapter.book.name} {note.verse.chapter.number}:{note.verse.number}</p>
                <p>{note.noteText}</p>
            </div>
        </>
    )
}
