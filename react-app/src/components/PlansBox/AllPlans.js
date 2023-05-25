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

        <div className='plan-field inner-all-plans'>

            <div className="title-and-back-arrow">
                <i className="fa-solid fa-arrow-left back-arrow" onClick={() => setPlansField('myPlans')} ></i>
                <h2>All plans</h2>
            </div>

            {Object.values(plans).map(plan => {
                return (


                    <div className='plan-box' key={plan.id} onClick={() => openPlanDetails(plan.id)}>
                        <h4 >{plan.name}</h4>
                        {(plan.id in currentPlanTemplateIds) && <p className='enrolled-flag'>You're enrolled in this plan</p>}
                        <p className='italics'>{plan.duration} days</p>
                        <p>{plan.description}</p>
                    </div>



                )
            })}
        </div>
    )
}
