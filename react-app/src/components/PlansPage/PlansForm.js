import { useEffect, useState } from "react"
import './PlansPage.css'

export default function PlansForm() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('3');
    const [appliedDuration, setAppliedDuration] = useState('3');
    const [isPublic, setIsPublic] = useState(false);
    const [tasks, setTasks] = useState(Array(parseInt(appliedDuration)).fill(['']).map(arr => Array.from(arr)));
    const [daySelected, setDaySelected] = useState(0);
    const [errors, setErrors] = useState({});
    const [durationError, setDurationError] = useState({});


    useEffect(() => {
        const len = tasks.length;

        let newArr;

        if (len < parseInt(appliedDuration)) {

            newArr = Array(parseInt(appliedDuration) - len).fill(['']).map(arr => Array.from(arr));
            setTasks([...tasks, ...newArr]);
        } else {
            if (daySelected + 1 > parseInt(appliedDuration)) {
                setDaySelected(parseInt(appliedDuration) - 1);
            }
            setTasks(tasks.slice(0, parseInt(appliedDuration)));
        }

    }, [appliedDuration]);

    const createPlan = e => {
        
    }

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

    const removeTask = (e, day, i) => {
        const newTasks = [...tasks];
        newTasks[day] = [...newTasks[day]];
        newTasks[day].splice(i, 1)
        setTasks(newTasks);
    }


    const changeDuration = e => {

        setDurationError({});

        const err = {};


        if (parseInt(duration) > 365) {
            err.duration = 'Duration cannot be greater than 365 days'
        }

        if (parseInt(duration) < 3) {
            err.duration = 'Duration cannot be less than 3 days'

        }

        if (err.duration) {
            setDurationError(err)
        } else {
            setAppliedDuration(duration);
        }


    }

    return (
        <div>
            <form className="plan-form" onSubmit={createPlan}>
                <div className="form-plan-details">
                    <h2>Create plan</h2>
                    <label>Name <input value={name} onChange={e => setName(e.target.value)} /></label>
                    <label>Description <input value={description} onChange={e => setDescription(e.target.value)} /></label>
                    <label>{appliedDuration} Curret Duration <input type="number" value={duration} onChange={e => setDuration(e.target.value)} /><button onClick={changeDuration} type="button">Apply</button></label>
                    {durationError.duration && <p>{durationError.duration}</p>}

                    <label>Public <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(!isPublic)} /></label>

                    <button type="submit">Create Plan</button>
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
                                <div key={i} className="task">
                                    <label>Task {i + 1}</label>
                                    <textarea className="task-textarea" value={task} onChange={e => updateTasks(e, daySelected, i)} />
                                    {i !== 0 && <i className="fa-solid fa-xmark" onClick={e => removeTask(e, daySelected, i)}></i>}
                                </div>
                            )
                        })}
                        <i className="fa-solid fa-plus" onClick={e => addTask(e, daySelected)}></i>

                    </div>

                </div>
            </form >

        </div >
    )
}
