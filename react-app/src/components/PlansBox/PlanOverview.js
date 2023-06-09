import { useDispatch, useSelector } from "react-redux"
import { enrollPlanThunk } from "../../store/session"


export default function PlanOverview({ plan, setPlansField, setSelectedPlan }) {

    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch()

    const enroll = async e => {
        const res = await dispatch(enrollPlanThunk(plan.id));

        if (res.message && res.message === 'Success!') {

            setSelectedPlan(user.enrolledPlans.length)
            setPlansField('planDetails')
        } else if (res.errors && res.errors === 'Plan Not Found') {
            alert("Plan is no longer available")
            setPlansField('allPlans')
        } else {
            alert("Something went wrong")
        }

    }

    return (
        <>
            <div className="title-and-back-arrow">
                <i className="fa-solid fa-arrow-left back-arrow" onClick={() => setPlansField('allPlans')} ></i>
                <h2>Plan Overview</h2>
            </div>

            <div className="plan-field">
                <h3>{plan.name}</h3>
                {plan.imageUrl && <div className='plan-img-container'><img className="plan-img" src={plan.imageUrl} alt={`Image for plan: ${plan.name}`}></img></div>}
                <div>
                    <p>Duration: {plan.duration} days</p>
                    <p>{plan.description}</p>
                    <p>Author: {plan.author.name}</p>
                </div>
                <button className="bttn-face" onClick={enroll}>Begin</button>
            </div>
        </>
    )
}
