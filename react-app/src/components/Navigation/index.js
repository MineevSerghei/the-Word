import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='nav-ul'>
			<li>
				<NavLink className='nav-left-links' exact to="/">Home</NavLink>
				<NavLink className='nav-left-links' to="/read">Read</NavLink>
			</li>
			{isLoaded && (
				<>
					{sessionUser ?
						<li>
							<ProfileButton user={sessionUser} />
						</li>
						:
						<li>

							<OpenModalButton
								className='log-in-sign-up-bttns'
								buttonText="Log In"
								modalComponent={<LoginFormModal />}
							/>

							<OpenModalButton
								className='log-in-sign-up-bttns'
								buttonText="Sign Up"
								modalComponent={<SignupFormModal />}
							/>
						</li>
					}
				</>
			)



			}
		</ul>
	);
}

export default Navigation;
