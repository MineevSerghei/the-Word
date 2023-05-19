
export default function PlanOverview({ plan, setPlansField }) {



    return (
        <div>
            <div><i onClick={() => setPlansField('allPlans')} className="fa-solid fa-chevron-left"></i><h2 className='plan-name'> Plan Overview</h2></div>
            <h3>{plan.name}</h3>
            <div>
                <p>{plan.duration} days</p>
                <p>{plan.description}</p>
            </div>
            <button>Begin</button>
        </div>
    )
}
