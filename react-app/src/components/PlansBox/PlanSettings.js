import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { unenrollPlanThunk } from '../../store/session';
import ConfirmUnenrollModal from './ConfirmUnenrollModal';
import OpenModalButton from "../OpenModalButton";

export default function PlanSettings({ plan, setPlansField }) {

    const dispatch = useDispatch();


    return (
        <div>

            <div className="title-and-back-arrow">
                <i className="fa-solid fa-arrow-left back-arrow" onClick={() => setPlansField('planDetails')} ></i>
                <h2>Plan Settings</h2>
            </div>

            <OpenModalButton
                className='bttn-face unenroll-bttn'
                buttonText="UNENROLL"
                modalComponent={<ConfirmUnenrollModal plan={plan} setPlansField={setPlansField} />}
            />
        </div>
    )
}
