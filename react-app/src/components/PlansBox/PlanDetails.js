import { useState } from 'react'
// import './PlansBox.css'

export default function PlanDetails({ plan }) {

    const [selectedDay, setSelectedDay] = useState(0)


    const daysRef = Array(plan.duration).fill([])
    const days = daysRef.map(arr => Array.from(arr));

    for (let task of plan.tasks) {
        days[task.day - 1].push(task);
    }

    return (
        <div>
            <h2>Plan Details</h2>
            <h3>{plan.name}</h3>
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
                            <input type="checkbox" />
                            {task.description}
                        </label>
                    </div>
                )
            })}
        </div>
    )
}
