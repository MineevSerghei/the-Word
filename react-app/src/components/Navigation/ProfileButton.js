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
            <li className='drop-down-link-li'><Link className='drop-down-link-Link' onClick={closeMenu} to='/account'>Account</Link></li>
            <li className='drop-down-link-li'><Link className='drop-down-link-Link' onClick={closeMenu} to='/notes'>Notes</Link></li>
            <li className='drop-down-link-li'><Link className='drop-down-link-Link' onClick={closeMenu} to='/plans'>Plans</Link></li>
            <li>
              <button className="bttn-face" onClick={handleLogout}>Log Out</button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
