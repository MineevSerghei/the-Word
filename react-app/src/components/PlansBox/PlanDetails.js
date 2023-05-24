import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleCompletedThunk } from '../../store/session';

export default function PlanDetails({ plan, setPlansField }) {

    const user = useSelector(state => state.session.user);

    const today = () => {

        const startDate = new Date(plan.startDate);
        // const pseudoToday = new Date();
        // pseudoToday.setDate(pseudoToday.getDate() + 10)
        const todayDate = new Date();
        return Math.floor((todayDate - startDate) / (1000 * 60 * 60 * 24));

    }

    const [selectedDay, setSelectedDay] = useState(today() + 1)
    const [todayIndex, setTodayIndex] = useState(today() + 1)
    const dispatch = useDispatch();

    const daysRef = Array(plan.duration).fill([])
    const days = daysRef.map(arr => Array.from(arr));

    for (let task of plan.tasks) {
        days[task.day - 1].push(task);
    }

    const startDate = new Date(plan.startDate);

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

                        const date = new Date(new Date().setDate(startDate.getDate() + i));
                        const displayDate = date.getDate();
                        const displayMonth = date.getMonth() + 1;

                        return (

                            <div onClick={() => setSelectedDay(i + 1)} key={i} className={className} >
                                <p>{displayMonth}/{displayDate}</p>
                                {todayIndex === i + 1 && <span>today</span>}
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
