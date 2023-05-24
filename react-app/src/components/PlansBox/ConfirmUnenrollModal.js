
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { unenrollPlanThunk } from "../../store/session";


export default function ConfirmUnenrollModal({ setPlansField, plan }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const unenroll = async e => {
        await dispatch(unenrollPlanThunk(plan.id));
        setPlansField('myPlans');
        closeModal();
    }

    return (
        <>
            <h3>Are you sure you want to unenroll this plan?</h3>
            <p>Your completed tasks will be lost and if the plan isn't publically available anymore (or isn't your own custom plan), then you might not be able to enroll it again</p>
            <div>
                <button onClick={unenroll}>Yes (DELETE)</button>
                <button onClick={() => closeModal()}>No (Keep)</button>
            </div>
        </>
    );
}
