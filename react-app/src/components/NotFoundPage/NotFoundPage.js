import "./NotFoundPage.css";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import LoginFormModal from "../LoginFormModal";

export default function NotFoundPage() {

    const user = useSelector(state => state.session.user);


    return <div className="not-found-page">
        <h1 className="teal">Sorry, we couldn't find it :(</h1>
        <h3>Maybe these could help?</h3>
        <ul className="help-links">
            <div className="help-box">
                <Link className='help-link' exact to="/read">Read</Link>
                <p className="help-p-tag">Read the Bible</p>
            </div>
            <div className="help-box">
                <Link className='help-link' to="/about">About</Link>
                <p className="help-p-tag">About the Word</p>
            </div>

            {user ?
                <>
                    <div className="help-box">
                        <Link className='help-link' to="/notes">Notes</Link>
                        <p className="help-p-tag">View All Notes</p>
                    </div>
                    <div className="help-box">
                        <Link className='help-link' to="/plans">Custom Plans</Link>
                        <p className="help-p-tag">View All Custom Plans</p>
                    </div>
                </>
                :
                <>
                    <div className="help-box">
                        <OpenModalButton
                            className='help-login-signup'
                            buttonText="Sign Up"
                            modalComponent={<SignupFormModal />}
                        />
                        <p className="help-p-tag">Sign Up</p>
                    </div>
                    <div className="help-box">
                        <OpenModalButton
                            className='help-login-signup'
                            buttonText="Log In"
                            modalComponent={<LoginFormModal />}
                        />
                        <p className="help-p-tag">Log In</p>
                    </div></>
            }
        </ul>
    </div>
}
