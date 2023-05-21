import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { unenrollPlanThunk } from '../../store/session';

export default function PlanSettings({ plan, setPlansField }) {

    const dispatch = useDispatch();

    const unenroll = async e => {
        await dispatch(unenrollPlanThunk(plan.id))
        setPlansField('myPlans')

        console.log("RESULT--->",)
    }


    return (
        <div>
            <i onClick={() => setPlansField('planDetails')} className="fa-solid fa-chevron-left"></i>
            <button onClick={unenroll}>unenroll</button>
        </div>
    )
}
