import { useEffect, useState } from "react"
import './PlansPage.css'

export default function PlansForm() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('3');
    const [isPublic, setIsPublic] = useState(false);

    const [tasks, setTasks] = useState(Array(parseInt(duration)).fill(['']).map(arr => Array.from(arr)));
    const [daySelected, setDaySelected] = useState(0);


    useEffect(() => {
        const len = tasks.length;

        let newArr;

        if (len < duration) {

            newArr = Array(parseInt(duration) - len).fill(['']).map(arr => Array.from(arr))
            setTasks([...tasks, ...newArr])
        } else {
            if (daySelected + 1 > parseInt(duration)) {
                setDaySelected(parseInt(duration) - 1)
            }
            setTasks(tasks.slice(0, parseInt(duration)))
        }

    }, [duration])



    const updateTasks = (e, day, i) => {
        const newTasks = [...tasks];
        newTasks[day] = [...newTasks[day]];
        newTasks[day][i] = e.target.value;
        setTasks(newTasks);
    }

    const addTask = (e, day) => {
        const newTasks = [...tasks];
        newTasks[day] = [...newTasks[day]];
        newTasks[day].push('')
        setTasks(newTasks);
    }

    const removeTask = (e, day) => {
        const newTasks = [...tasks];
        newTasks[day] = [...newTasks[day]];
        newTasks[day].pop()
        setTasks(newTasks);
    }


    const changeDuration = e => {

        if (parseInt(e.target.value) <= 365 && parseInt(e.target.value) >= 3) {
            setDuration(e.target.value)
        }
    }

    return (
        <div>
            <form className="plan-form">
                <div className="form-plan-details">
                    <h2>Create plan</h2>
                    <label>Name <input value={name} onChange={e => setName(e.target.value)} /></label>
                    <label>Description <input value={description} onChange={e => setDescription(e.target.value)} /></label>
                    <label>{duration} duration <input type="number" value={duration} onChange={changeDuration} /></label>
                    <label>Public <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(!isPublic)} /></label>
                </div>
                <div className="form-tasks">
                    <h2>Add tasks</h2>
                    <div className='days'>
                        {tasks.map((day, i) => {

                            const large = daySelected === i ? ' large' : ''
                            return (


                                < div key={i} className={`day-div${large}`} onClick={() => setDaySelected(i)} >
                                    <p>{i + 1}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="tasks-list">
                        {tasks[daySelected].map((task, i) => {
                            return (
                                <label>Task {i + 1}<input value={task} onChange={e => updateTasks(e, daySelected, i)} /></label>
                            )
                        })}
                        <button type="button" onClick={e => addTask(e, daySelected)}>add task</button>
                        {tasks[daySelected].length > 1 && <button type="button" onClick={e => removeTask(e, daySelected)}>remove task</button>}
                    </div>
                </div>
            </form >

        </div >
    )
}
