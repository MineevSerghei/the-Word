
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
            <h3>Are you sure you want to delete this note?</h3>
            <div className="flex-col gap10">
                <button className="bttn-face unenroll-bttn" onClick={deleteNote}>Yes (DELETE)</button>
                <button className="bttn-face" onClick={() => closeModal()}>No (Keep)</button>
            </div>
        </>
    );
}
