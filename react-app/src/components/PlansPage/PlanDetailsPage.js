import { useEffect, useState } from "react"
import './PlansPage.css'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import ConfirmPlanDeleteModal from "./ConfirmPlanDeleteModal";
import { enrollPlanThunk } from "../../store/session";

export default function PlanDetailsPage() {

    const { planId } = useParams();
    const user = useSelector(state => state.session.user);
    const plan = useSelector(state => state.session.user.authoredPlans).find(plan => plan.id === parseInt(planId));
    const dispatch = useDispatch();
    const [daySelected, setDaySelected] = useState(0);
    const history = useHistory();


    useEffect(() => {
        const selectedDiv = document.getElementById("selected-div");
        if (selectedDiv) selectedDiv.scrollIntoView({ inline: "center" });
    }, [daySelected])

    if (!plan) {
        history.push('/plans');
        return null;
    }


    const userEnrolledTemplateIds = [];

    for (let plan of user.enrolledPlans) {
        userEnrolledTemplateIds.push(plan.templateId);
    }

    const incomingTasks = Array(parseInt(plan.duration)).fill([]).map(arr => Array.from(arr));

    for (let task of plan.tasks) {
        incomingTasks[task.day - 1].push(task.description)
    }

    const enroll = async e => {
        const res = await dispatch(enrollPlanThunk(plan.id));

        if (res.message && res.message === 'Success!') {

        } else if (res.errors && res.errors === 'Plan Not Found') {
            alert("Plan is no longer available")
            history.push('/plans')
        } else {
            alert("Something went wrong")
        }

    }

    return (
        <div>
            <div className="plan-form plan-page-details">
                <div className="form-plan-details plan-page-details-left">
                    <h2>Plan Details</h2>
                    <div className='plan-img-page-container'><img className="plan-img-page" src={plan.imageUrl} alt={`Image for plan: ${plan.name}`}></img></div>
                    <p className="p-plan-form">{plan.name}</p>
                    <p className="p-plan-form">{plan.description}</p>
                    <p>Duration: <span className="bold">{plan.duration}</span>  days </p>


                    <p className="p-plan-form">Public:  {plan.isPublic ? 'Yes' : 'No'}</p>

                    <div>
                        {userEnrolledTemplateIds.includes(plan.id) ? <p className="enrolled-flag">You are following this plan!</p> :
                            <button className="bttn-smaller" onClick={enroll}>Begin</button>}
                        <button className="bttn-smaller" onClick={() => history.push(`/plans/${planId}/edit`)}>Edit Plan</button>
                        <OpenModalButton
                            className='bttn-smaller'
                            buttonText="Delete Plan"
                            modalComponent={<ConfirmPlanDeleteModal planId={planId} />}
                        />
                    </div>

                </div>
                <div className="form-tasks">
                    <h2>Tasks</h2>
                    <div className='days'>
                        {incomingTasks.map((day, i) => {

                            const large = daySelected === i ? ' large' : ''
                            return (


                                < div key={i}
                                    id={daySelected === i ? 'selected-div' : null}
                                    className={`day-div${large}`} onClick={() => setDaySelected(i)} >
                                    <p>{i + 1}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="tasks-list">
                        {incomingTasks[daySelected].map((task, i) => {
                            return (
                                <div key={i} className="task">
                                    <p>{task}</p>
                                </div>
                            )
                        })}

                    </div>

                </div>
            </div >

        </div >
    )
}
