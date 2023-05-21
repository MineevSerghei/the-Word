import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link } from "react-router-dom";


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="profile-bttn" onClick={openMenu}>
        <i className="fa-regular fa-user"></i>
      </div>
      <ul className={ulClassName} ref={ulRef}>
        {user && (
          <>
            <li>{user.name}</li>
            <li><Link to='/account'>Account</Link></li>
            <li><Link to='/notes'>Notes</Link></li>
            <li><Link to='/plans'>Plans</Link></li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
