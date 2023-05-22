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

    if (!user) return <h2>Please sign in to see your Plans</h2>

    const myPlans = user.enrolledPlans;
    return (
        <div>

            {plansField === 'myPlans' &&
                <div>
                    <h2>My Plans<span><button onClick={() => setPlansField('allPlans')}>all plans</button></span></h2>


                    {myPlans.map((plan, planIndex) => {

                        let competed = 0;
                        for (let task of plan.tasks) {
                            if (task.isCompleted) competed++
                        }

                        return (<div className='plan-box' key={plan.id} onClick={() => openPlanDetails(planIndex)}>
                            <h4 >{plan.name} ({competed / plan.tasks.length * 100}%)</h4>
                            <p>{plan.description}</p>
                        </div>)
                    })}

                </div>}

            {plansField === 'planDetails' &&
                <div>
                    <PlanDetails plan={myPlans[selectedPlan]} setPlansField={setPlansField} />
                </div>}

            {plansField === 'allPlans' &&
                <div>
                    <AllPlans setPlansField={setPlansField} setSelectedPublicPlan={setSelectedPublicPlan} />
                </div>}

            {plansField === 'planOverview' && allPlans &&
                <div>
                    <PlanOverview setPlansField={setPlansField} plan={allPlans[selectedPublicPlan]} setSelectedPlan={setSelectedPlan} />
                </div>}

            {plansField === 'planSettings' &&
                <div>
                    <PlanSettings setPlansField={setPlansField} plan={myPlans[selectedPlan]} setSelectedPlan={setSelectedPlan} />
                </div>}

        </div>
    )
}