import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(['Incorrect email or password']);
    } else {
      closeModal()
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('serghei@aa.io', 'password'));
    if (data) {
      setErrors(['Incorrect email or password']);
    } else {
      closeModal()
    }
  };

  return (
    <>
      <h1 className="modal-title">Log In</h1>
      <form className="modal login-modal" onSubmit={handleSubmit}>
        <ul className="no-margin-bttm">
          {errors.map((error, idx) => (
            <li className="error" key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="bttn-face" type="submit">Log In</button>
        <button className="bttn-face" type="button" onClick={demoLogin}>Demo</button>
      </form>
    </>
  );
}

export default LoginFormModal;
