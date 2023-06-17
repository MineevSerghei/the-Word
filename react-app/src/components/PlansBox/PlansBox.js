import { useState } from 'react'
import './PlansBox.css'
import { useSelector } from 'react-redux'
import PlanDetails from './PlanDetails'
import AllPlans from './AllPlans'
import PlanOverview from './PlanOverview';
import PlanSettings from './PlanSettings'

export default function PlansBox() {

    const user = useSelector(state => state.session.user)
    const allPlans = useSelector(state => state.plans.allPublicPlans);

    const [plansField, setPlansField] = useState('myPlans')
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [selectedPublicPlan, setSelectedPublicPlan] = useState(null)

    const openPlanDetails = planIndex => {
        setSelectedPlan(planIndex)
        setPlansField('planDetails')
    }

    if (!user) {
        return <h2>Please sign in to see your Plans</h2>
    }


    const myPlans = user.enrolledPlans;
    return (
        <div className='plans-box'>

            {plansField === 'myPlans' &&
                <div className='plan-field my-plans'>
                    <h2>My Plans</h2>


                    {myPlans.map((plan, planIndex) => {

                        let competed = 0;
                        for (let task of plan.tasks) {
                            if (task.isCompleted) competed++
                        }

                        return (<div className='plan-box' key={plan.id} onClick={() => openPlanDetails(planIndex)}>
                            {plan.imageUrl && <div className='plan-img-container'><img className="plan-img" src={plan.imageUrl} alt={`Image for plan: ${plan.name}`}></img></div>}
                            <h4 >{plan.name} ({Math.round(competed / plan.tasks.length * 100)}%)</h4>
                            <p>{plan.description}</p>
                        </div>)
                    })}
                    <span><button className='view-all-plans-bttn' onClick={() => setPlansField('allPlans')}>View All Available Plans</button></span>
                </div>}

            {plansField === 'planDetails' &&
                <div className='plan-field plan-details'>
                    <PlanDetails plan={myPlans[selectedPlan]} setPlansField={setPlansField} />
                </div>}

            {plansField === 'allPlans' &&
                <div className='plan-field all-plans'>
                    <AllPlans setPlansField={setPlansField} setSelectedPublicPlan={setSelectedPublicPlan} />
                </div>}

            {plansField === 'planOverview' && allPlans &&
                <div className='plan-field plan-overview'>
                    <PlanOverview setPlansField={setPlansField} plan={allPlans[selectedPublicPlan]} setSelectedPlan={setSelectedPlan} />
                </div>}

            {plansField === 'planSettings' &&
                <div className='plan-field plan-settings'>
                    <PlanSettings setPlansField={setPlansField} plan={myPlans[selectedPlan]} setSelectedPlan={setSelectedPlan} />
                </div>}

        </div>
    )
}
