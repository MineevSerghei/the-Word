import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const err = [];

		if (email.length <= 0) err.push('Email is required');
		if (name.length <= 0) err.push('Name is required');
		if (password.length < 8) err.push('Password must be 8 characters or longer');
		if (password !== confirmPassword) err.push("Confirm Password field doesn't match the Password field");

		if (err.length > 0) {
			setErrors(err)
		}

		else {
			const data = await dispatch(signUp(name, email, password));
			if (data) {
				const emailErr = 'email : Invalid email address.';
				if (data.includes(emailErr)) {
					data[data.indexOf(emailErr)] = 'Invalid email address';
				}
				setErrors(data);
			} else {
				closeModal();
			}
		}
	};

	return (
		<>
			<h1 className="modal-title">Sign Up</h1>
			<form className="modal" onSubmit={handleSubmit}>
				<ul className="no-margin-bttm">
					{errors.map((error, idx) => (
						<li className="error" key={idx}>{error}</li>
					))}
				</ul>
				<label>
					<span className="required-star">*</span> Email <input
						type="text"
						name="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					<span className="required-star">*</span> Name <input
						type="text"
						name="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</label>
				<label>
					<span className="required-star">*</span> Password <input
						type="password"
						name="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					<span className="required-star">*</span> Confirm Password <input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className="bttn-face" type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
