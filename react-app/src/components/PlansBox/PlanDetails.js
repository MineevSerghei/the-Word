import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleCompletedThunk } from '../../store/session';
// import './PlansBox.css'

export default function PlanDetails({ plan, setPlansField }) {

    const user = useSelector(state => state.session.user);

    const [selectedDay, setSelectedDay] = useState(0)
    const [, forceRerender] = useState('')
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
        <div>
            <i onClick={() => setPlansField('myPlans')} className="fa-solid fa-chevron-left"></i>
            <h2>Plan Details</h2>
            <h3>{plan.name} ({competed / plan.tasks.length * 100}%)</h3>
            <div className='days'>
                {days.map((day, i) => {
                    return (
                        <div onClick={() => setSelectedDay(i + 1)} key={i} className='day-div' >
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
    )
}
