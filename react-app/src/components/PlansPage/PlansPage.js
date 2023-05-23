import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function PlansPage() {

    const user = useSelector(state => state.session.user)

    return (
        <div className="plans-page-wrapper">
            <h2>My plans</h2>
            <p className="plan-kind-p-tag">These are the plans that you are currently enrolled in</p>
            {user.enrolledPlans.map((plan, planIndex) => {

                let competed = 0;
                for (let task of plan.tasks) {
                    if (task.isCompleted) competed++
                }

                return (<div className='plan-page-box' key={plan.id} >
                    <h4 >{plan.name} ({Math.round(competed / plan.tasks.length * 100)}% )</h4>
                    <p>{plan.description}</p>
                </div>)
            })}

            <h2>My custom plans</h2>
            <Link to='/plans/custom' className='create-plan-link'><i className="fa-solid fa-plus"></i> Create Custom Plan</Link>
            <p className="plan-kind-p-tag">These are the plans that you have created yourself</p>

            {user.authoredPlans.map((plan, planIndex) => {

                return (<div className='plan-page-box authored' key={plan.id} >
                    <h4 >{plan.name}</h4>
                    <p className="italics">{plan.duration} days</p>
                    <p>{plan.description}</p>
                </div>)
            })}


            {/* <h2>Completed plans</h2>
            <p>These are the plans that you have completed</p> */}

        </div>
    )
}
