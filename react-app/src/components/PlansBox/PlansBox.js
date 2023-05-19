import { useState } from 'react'
import './PlansBox.css'
import { useSelector } from 'react-redux'
import PlanDetails from './PlanDetails'

export default function PlansBox() {

    const user = useSelector(state => state.session.user)


    const [plansField, setPlansField] = useState('myPlans')
    const [selectedPlan, setSelectedPlan] = useState(null)

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
                    <h2>My Plans</h2>
                    {myPlans.map((plan, planIndex) => {

                        let competed = 0;
                        for (let task of plan.tasks) {
                            if (task.isCompleted) competed++
                        }

                        return (<div className='plan-box' key={plan.id}>
                            <h4 onClick={() => openPlanDetails(planIndex)}>{plan.name} ({competed / plan.tasks.length * 100}%)</h4>
                            <p>{plan.description}</p>
                        </div>)
                    })}
                </div>}

            {plansField === 'planDetails' &&
                <div>
                    <PlanDetails plan={myPlans[selectedPlan]} setPlansField={setPlansField} />
                </div>}

        </div>
    )
}
