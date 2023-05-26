import ConfirmDeleteModal from "./ConfirmDeleteModal";
import OpenModalButton from "../OpenModalButton";

export default function NoteDetails({ setField, note }) {

    const openEditNote = e => {
        setField('editNote')
    }

    if (!note || !note.verse || !note.verse.chapter) {
        setField('allNotes')
        return null;
    }



    return (
        <>
            <div className="title-and-back-arrow">
                <i className="fa-solid fa-arrow-left back-arrow" onClick={() => setField('allNotes')} ></i>
                <h2>Note</h2>
            </div>



            <br></br>
            <div className="note-wrapper">

                <div className="note-div">
                    <p className="no-margin">{note.verse.chapter.book.name} {note.verse.chapter.number}:{note.verse.number}</p>
                    <p className="note-text">{note.noteText}</p>
                    <p className="smaller">{new Date(note.createdAt).toDateString()}</p>

                    <div className="edit-delete-note-bttns">
                        <button className='bttn-face' onClick={openEditNote} >Edit</button>
                        <OpenModalButton
                            className='bttn-face bttn-face-delete'
                            buttonText="Delete"
                            modalComponent={<ConfirmDeleteModal noteId={note.id} setField={setField} />}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}
