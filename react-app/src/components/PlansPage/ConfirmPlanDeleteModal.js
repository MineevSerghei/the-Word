import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePlanThunk } from "../../store/session";
import { useHistory } from "react-router-dom";


export default function ConfirmPlanDeleteModal({ planId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory();

    const deletePlan = async (e) => {
        await dispatch(deletePlanThunk(planId));
        closeModal()
        history.push('/plans')
    };

    return (
        <>
            <h3>Are you sure you want to delete the plan?</h3>
            <p>It will disappear from the public repository of plans as well as your custom plans and WILL NOT be recoverable</p>
            <p>Anyone who is enrolled in this plan however (including you) will be able to complete it </p>
            <div className="flex-col gap10">
                <button className="bttn-face unenroll-bttn" onClick={deletePlan}>Yes (DELETE)</button>
                <button className="bttn-face" onClick={() => closeModal()}>No (Keep)</button>
            </div>
        </>
    );
}
