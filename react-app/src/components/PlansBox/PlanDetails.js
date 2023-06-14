import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleCompletedThunk } from '../../store/session';

export default function PlanDetails({ plan, setPlansField }) {

    const today = () => {

        const startDate = new Date(plan.startDate);
        // const pseudoToday = new Date();
        // pseudoToday.setDate(pseudoToday.getDate() + 10)
        const todayDate = new Date();

        const diff = Math.floor((todayDate - startDate) / (1000 * 60 * 60 * 24));

        if (diff > plan.duration - 1 || diff < 0) {
            return null;
        }
        return diff + 1;
    }

    const findFirstNonCompletedDay = () => {
        for (let task of plan.tasks) {
            if (task.isCompleted === false) {
                return task.day;
            }
        }
        return plan.duration;
    }


    const [todayIndex, setTodayIndex] = useState(today());
    const [selectedDay, setSelectedDay] = useState(findFirstNonCompletedDay());
    const dispatch = useDispatch();

    useEffect(() => {
        const selectedDiv = document.getElementById("selected-div");
        if (selectedDiv) selectedDiv.scrollIntoView({ inline: "center" });
    }, [selectedDay])

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
                <div className='plan-img-container'><img className="plan-img" src={plan.imageUrl} alt={`Image for plan: ${plan.name}`}></img></div>


                <div className='days'>
                    {days.map((day, i) => {
                        let className = selectedDay === i + 1 ? 'large day-div flex-col' : "day-div flex-col"


                        const date = new Date(new Date().setDate(startDate.getDate() + i + 1));
                        const displayDate = date.getDate();
                        const displayMonth = date.getMonth() + 1;

                        let completed = true;

                        for (let task of day) {
                            if (!task.isCompleted) {
                                completed = false;
                                break;
                            }
                        }

                        return (

                            <div onClick={() => setSelectedDay(i + 1)}
                                key={i}
                                id={selectedDay === i + 1 ? 'selected-div' : null}
                                className={className} >
                                {todayIndex === i + 1 && <span className='small'>today</span>}
                                <p>{displayMonth}/{displayDate}</p>
                                {completed && <i className="fa-solid fa-check done-mark"></i>}
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
