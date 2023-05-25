
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
            <p>Your completed tasks will be lost and if the plan isn't publically available anymore <br></br> (or isn't your own custom plan), then you will not be able to enroll it again</p>
            <div className="flex-col gap10">
                <button className="bttn-face unenroll-bttn" onClick={unenroll}>Yes (DELETE)</button>
                <button className="bttn-face" onClick={() => closeModal()}>No (Keep)</button>
            </div>
        </>
    );
}
