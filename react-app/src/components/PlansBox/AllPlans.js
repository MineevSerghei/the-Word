import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllPlansThunk } from '../../store/plans';

export default function AllPlans({ setPlansField }) {

    const plans = useSelector(state => state.plans.allPublicPlans)
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(getAllPlansThunk());

    }, [])


    const openPlanDetails = planId => {
        // setSelectedPlan(planId)
        // setPlansField('planOverview')
    }

    if (!plans) return null;

    return (

        <div>
            <h2><i onClick={() => setPlansField('myPlans')} className="fa-solid fa-chevron-left"></i>All plans</h2>
            {Object.values(plans).map(plan => {
                return (<div className='plan-box' key={plan.id} onClick={() => openPlanDetails(plan.id)}>
                    <h4 >{plan.name}</h4>
                    <p>{plan.description}</p>
                </div>)
            })}
        </div>
    )
}
