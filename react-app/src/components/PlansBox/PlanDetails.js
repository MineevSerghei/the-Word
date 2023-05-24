import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleCompletedThunk } from '../../store/session';

// import './PlansBox.css'

export default function PlanDetails({ plan, setPlansField }) {

    const user = useSelector(state => state.session.user);


    const [selectedDay, setSelectedDay] = useState(1)
    const dispatch = useDispatch();

    const daysRef = Array(plan.duration).fill([])
    const days = daysRef.map(arr => Array.from(arr));

    for (let task of plan.tasks) {
        days[task.day - 1].push(task);
    }

    const toggleCompleted = async (e, taskId, planId) => {

        await dispatch(toggleCompletedThunk(taskId, planId))
    }

    let competed = 0;
    for (let task of plan.tasks) {
        if (task.isCompleted) competed++
    }

    return (
        <>
            <div className="title-and-back-arrow">
                <i className="fa-solid fa-arrow-left back-arrow" onClick={() => setPlansField('myPlans')} ></i>
                <h2>Plan Details</h2>
            </div>

            <div className='plan-field plan-details'>

                <h3>{plan.name} ({Math.round(competed / plan.tasks.length * 100)}%) <i onClick={(e) => setPlansField('planSettings')} className="fa-solid fa-gear"></i></h3>


                <div className='days'>
                    {days.map((day, i) => {
                        let className = selectedDay === i + 1 ? 'large day-div' : "day-div"
                        return (

                            <div onClick={() => setSelectedDay(i + 1)} key={i} className={className} >
                                <p>{i + 1}</p>
                            </div>
                        )
                    })}
                </div>
                {selectedDay && days[selectedDay - 1].map(task => {
                    return (
                        <div key={task.id}>
                            <label>
                                <input checked={task.isCompleted} onChange={e => toggleCompleted(e, task.id, plan.id)} type="checkbox" />
                                {task.description}
                            </label>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
