import { useEffect, useState } from "react"
import './PlansPage.css'
import { editPlanThunk } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function PlansEditForm() {

    const { planId } = useParams();
    const plan = useSelector(state => state.session.user.authoredPlans).find(plan => plan.id === parseInt(planId));

    if (!plan) {
        history.push('/')
    }

    const incomingTasks = Array(parseInt(plan.duration)).fill([]).map(arr => Array.from(arr));

    for (let task of plan.tasks) {
        incomingTasks[task.day - 1].push(task.description)
    }



    const [name, setName] = useState(plan.name);
    const [description, setDescription] = useState(plan.description);
    const [duration, setDuration] = useState(`${plan.duration}`);
    const [appliedDuration, setAppliedDuration] = useState(`${plan.duration}`);
    const [isPublic, setIsPublic] = useState(plan.isPublic);
    const [tasks, setTasks] = useState(incomingTasks);
    const [daySelected, setDaySelected] = useState(0);
    const [errors, setErrors] = useState({});
    const [durationError, setDurationError] = useState({});

    const dispatch = useDispatch();

    const history = useHistory();

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

    useEffect(() => {
        const selectedDiv = document.getElementById("selected-div");
        if (selectedDiv) selectedDiv.scrollIntoView({ inline: "center" });
    }, [daySelected])


    const createPlan = async e => {


        e.preventDefault();
        const err = {};

        if (name.length > 70) err.name = 'Plan name cannot be over 70 characters'
        if (name.length <= 0) err.name = 'Plan name cannot be empty'

        if (description.length > 700) err.description = 'Plan description cannot be over 700 characters'
        if (description.length <= 0) err.description = 'Plan description cannot be empty'

        if (parseInt(appliedDuration) < 3) err.appliedDuration = 'Duration cannot be less than 3 days'
        if (parseInt(appliedDuration) > 365) err.appliedDuration = 'Duration cannot be more than 365 days'

        for (let day = 0; day < tasks.length; day++) {
            for (let i = 0; i < tasks[day].length; i++) {
                if (tasks[day][i].length <= 0) {
                    if (err.tasks) {
                        err.tasks += `;Task descriptions cannot be empty (day ${day + 1}, task ${i + 1})`
                    } else {
                        err.tasks = `Task descriptions cannot be empty (day ${day + 1}, task ${i + 1})`
                    }
                }
                if (tasks[day][i].length > 500) {
                    if (err.tasks) {
                        err.tasks += `;Task descriptions cannot be over 500 characters (day ${day + 1}, task ${i + 1})`
                    } else {
                        err.tasks = `Task descriptions cannot be over 500 characters (day ${day + 1}, task ${i + 1})`
                    }
                }
            }
        }

        if (Object.keys(err).length > 0) {
            setErrors(err)
        } else {

            const plan = {
                name,
                description,
                duration: appliedDuration,
                isPublic,
                tasks
            }

            const res = await dispatch(editPlanThunk(plan, planId));

            history.push(`/plans/${planId}`)

        }

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
                    <h2>Edit plan</h2>
                    <label className="label-plan-form">Name <input value={name} onChange={e => setName(e.target.value)} /></label>
                    {errors.name && <p className="error">{errors.name}</p>}
                    <label className="label-plan-form">Description <textarea className="task-textarea" value={description} onChange={e => setDescription(e.target.value)} /></label>
                    {errors.description && <p className="error">{errors.description}</p>}
                    <label className="label-plan-form"><input type="number" value={duration} onChange={e => setDuration(e.target.value)} /><button onClick={changeDuration} type="button">Apply</button></label>
                    <span>Current Duration: <span className="bold">{appliedDuration}</span>  </span>
                    {errors.duration && <p>{errors.duration}</p>}
                    {durationError.duration && <p className="error">{durationError.duration}</p>}

                    <label className="label-plan-form">Do you want to make your plan public?  <input type="checkbox" checked={isPublic} onChange={e => setIsPublic(!isPublic)} /></label>

                    <button className="bttn" type="submit">Save Edit</button>
                </div>
                <div className="form-tasks">
                    <h2>Add tasks</h2>
                    <div className='days'>
                        {tasks.map((day, i) => {

                            const large = daySelected === i ? ' large' : ''
                            return (


                                < div key={i}
                                    id={daySelected === i ? 'selected-div' : null}
                                    className={`day-div${large}`} onClick={() => setDaySelected(i)} >
                                    <p>{i + 1}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className="tasks-list">
                        {errors.tasks && errors.tasks.split(';').map((err, i) => <p className="small error" key={i}>{err}</p>)}
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
