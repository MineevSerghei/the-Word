import { useEffect, useState } from "react"
import './PlansPage.css'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export default function PlanDetailsPage() {

    const { planId } = useParams();
    const plan = useSelector(state => state.session.user.authoredPlans).find(plan => plan.id === parseInt(planId));
    const dispatch = useDispatch();

    const history = useHistory();

    if (!plan) {
        history.push('/plans')
    }

    const incomingTasks = Array(parseInt(plan.duration)).fill([]).map(arr => Array.from(arr));

    for (let task of plan.tasks) {
        incomingTasks[task.day - 1].push(task.description)
    }

    const [tasks, setTasks] = useState(incomingTasks);
    const [daySelected, setDaySelected] = useState(0);





    return (
        <div>
            <div className="plan-form plan-page-details">
                <div className="form-plan-details plan-page-details-left">
                    <h2>Plan Details</h2>
                    <p className="p-plan-form">{plan.name}</p>
                    <p className="p-plan-form">{plan.description}</p>
                    <p>Duration: <span className="bold">{plan.duration}</span>  days </p>


                    <p className="p-plan-form">Public:  {plan.isPublic ? 'Yes' : 'No'}</p>

                    <div>
                        <button className="bttn-smaller" onClick={() => history.push(`/plans/${planId}/edit`)}>Edit Plan</button>
                        <button className="bttn-smaller">Delete Plan</button>
                    </div>

                </div>
                <div className="form-tasks">
                    <h2>Tasks</h2>
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
                                    <p>{task}</p>
                                </div>
                            )
                        })}

                    </div>

                </div>
            </div >

        </div >
    )
}
