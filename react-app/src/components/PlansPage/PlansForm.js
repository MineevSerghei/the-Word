import { useEffect, useState } from "react"

export default function PlansForm() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('1');
    const [isPublic, setIsPublic] = useState(false);

    const [tasks, setTasks] = useState(Array(parseInt(duration)).fill([]).map(arr => Array.from(arr)));
    const [daySelected, setDaySelected] = useState(0);





    useEffect(() => {
        setTasks(Array(parseInt(duration)).fill(['']).map(arr => Array.from(arr)))
        setDaySelected(0)
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

    return (
        <div>
            <form>
                <div>
                    <h2>Create plan</h2>
                    <label>Name <input value={name} onChange={e => setName(e.target.value)} /></label>
                    <label>Description <input value={description} onChange={e => setDescription(e.target.value)} /></label>
                    <label>duration <input type="number" value={duration} onChange={e => setDuration(e.target.value)} /></label>
                    <label>Public <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(!isPublic)} /></label>
                </div>
                <div>
                    <h2>Add tasks</h2>
                    <div className='days'>
                        {tasks.map((day, i) => {

                            return (
                                <div key={i} className='day-div' onClick={() => setDaySelected(i)} >
                                    <p>{i + 1}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div>
                        {tasks[daySelected].map((task, i) => {
                            return (
                                <label>Task {i + 1}<input value={task} onChange={e => updateTasks(e, daySelected, i)} /></label>
                            )
                        })}
                        <button type="button" onClick={e => addTask(e, daySelected)}>add task</button>
                    </div>
                </div>
            </form>

        </div>
    )
}
