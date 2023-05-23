import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPlansThunk } from '../../store/plans';

export default function AllPlans({ setPlansField, setSelectedPublicPlan }) {

    const plans = useSelector(state => state.plans.allPublicPlans)
    const user = useSelector(state => state.session.user)

    const currentPlanTemplateIds = {};

    for (let plan of user.enrolledPlans) {
        currentPlanTemplateIds[plan.templateId] = plan.id
    }

    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(getAllPlansThunk());

    }, [])


    const openPlanDetails = planId => {
        if (planId in currentPlanTemplateIds) {
            setPlansField('myPlans')
        } else {
            setSelectedPublicPlan(planId)
            setPlansField('planOverview')
        }
    }

    if (!plans) return null;

    return (

        <div>
            <h2><i onClick={() => setPlansField('myPlans')} className="fa-solid fa-chevron-left"></i>All plans</h2>
            {Object.values(plans).map(plan => {
                return (


                    <div className='plan-box' key={plan.id} onClick={() => openPlanDetails(plan.id)}>
                        <h4 >{plan.name}</h4>
                        {(plan.id in currentPlanTemplateIds) && <p>You're enrolled in this plan</p>}
                        <p className='italics'>{plan.duration} days</p>
                        <p>{plan.description}</p>
                    </div>



                )
            })}
        </div>
    )
}
