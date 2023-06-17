import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function PlansPage() {

    const user = useSelector(state => state.session.user)

    const history = useHistory();

    return (
        <div className="plans-page-wrapper">
            <h2>My custom plans</h2>
            <Link to='/plans/custom' className='create-plan-link'><i className="fa-solid fa-plus"></i> Create Custom Plan</Link>
            <p className="plan-kind-p-tag">These are the plans that you have created yourself</p>

            {user.authoredPlans.map((plan, planIndex) => {

                return (<div className='plan-page-box authored' key={plan.id} >
                    <div className='plan-img-page-container'><img className="plan-img-page" src={plan.imageUrl} alt={`Image for plan: ${plan.name}`}></img></div>
                    <h3 onClick={() => history.push(`/plans/${plan.id}`)} className="custom-plans-title" >{plan.name}</h3>
                    <p className="italics">{plan.duration} days</p>
                    <p>{plan.description}</p>
                </div>)
            })}

        </div>
    )
}
