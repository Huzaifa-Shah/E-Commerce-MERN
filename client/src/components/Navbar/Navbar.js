//React Hooks
import React from "react";

//Depedencies
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GOOGLE_LOGOUT, LOGOUT } from "../../store/constants/AuthConstants";

//Components and Styles
import "./Navbar.css";
import { BsFillCartFill } from "react-icons/bs";

export default function Navbar() {
  const { user } = useSelector((state) => state.AuthReducer);
  const { googleUser } = useSelector((state) => state.GoogleReducer);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("myToken");
    localStorage.removeItem("GoogleToken");
    dispatch({ type: LOGOUT });
    dispatch({ type: GOOGLE_LOGOUT });
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ color: "black" }}>
        <div className="logo">MERN E-Commerce</div>
      </Link>
      <ul className="nav_links">
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">
          &#9776;
        </label>
        {user || googleUser ? (
          <div className="menu">
            <li>
              <span style={{ marginRight: "0.5rem" }}>
                <BsFillCartFill />
              </span>
              <Link to="/cart">Cart</Link>
            </li>
            {!user.isAdmin && (
              <li>
                <Link to="/TOC">Become a Seller</Link>
              </li>
            )}
            {user && (
              <li>
                <Link to="/admin">
                  <div className="links">{user.name}</div>
                </Link>
              </li>
            )}
            {googleUser && (
              <li>
                <div className="links">{`${googleUser.givenName} ${googleUser.familyName}`}</div>
              </li>
            )}
            <li>
              <button className="btn" onClick={logout}>
                Logout
              </button>
            </li>
          </div>
        ) : (
          <div className="menu">
            <li>
              <Link to="/cart">
                <span style={{ marginRight: "0.5rem" }}>
                  <BsFillCartFill />
                </span>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/" className="links">
                About Us
              </Link>
            </li>
            <li>
              <Link className="btn" to="/login">
                Log In
              </Link>
            </li>
            <li>
              <Link className="btn" to="/register">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}
