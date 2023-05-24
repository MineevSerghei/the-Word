
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteNoteThunk } from "../../store/session";


export default function ConfirmDeleteModal({ noteId, setField }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteNote = async (e) => {
        await dispatch(deleteNoteThunk(noteId));
        closeModal()
        if (setField)
            setField('allNotes')

    };

    return (
        <>
            <h5>Are you sure you want to delete this note?</h5>
            <div>
                <button onClick={deleteNote}>Yes (DELETE)</button>
                <button onClick={() => closeModal()}>No (Keep)</button>
            </div>
        </>
    );
}
