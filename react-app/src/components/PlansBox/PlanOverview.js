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
        } else {
            alert('Something went wrong')
        }

    }

    return (
        <div>
            <div><i onClick={() => setPlansField('allPlans')} className="fa-solid fa-chevron-left"></i><h2 className='plan-name'> Plan Overview</h2></div>
            <h3>{plan.name}</h3>
            <div>
                <p>{plan.duration} days</p>
                <p>{plan.description}</p>
            </div>
            <button onClick={enroll}>Begin</button>
        </div>
    )
}
