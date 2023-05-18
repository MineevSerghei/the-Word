import { useState } from 'react'

export default function PlanDetails({ plan }) {

    return (
        <div>
            <h2>Plan Details</h2>
            <h3>{plan.name}</h3>
        </div>
    )
}
