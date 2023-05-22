import { Link } from "react-router-dom";

export default function PlansPage() {


    return (
        <div>
            <h2>My plans</h2>
            <p>These are the plans that you are currently enrolled in</p>

            <h2>My custom plans</h2>
            <p>These are the plans that you have created yourself</p>

            <Link to='/plans/custom'>Create Custom Plan</Link>

            <h2>Completed plans</h2>
            <p>These are the plans that you have completed</p>

        </div>
    )
}
