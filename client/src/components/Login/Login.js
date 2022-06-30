import React, { useState, useEffect } from "react";

//Depedencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

//styles and components
import "../Register/Register.css";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsGoogle } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { userLogin } from "../../store/asyncMethods/AuthMethod";

export default function Login() {
  //Hooks
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, loginErrors, user  } = useSelector(
    (state) => state.AuthReducer
  );

  useEffect(() => {
    if (loginErrors.length > 0) {
      loginErrors.map((error) => toast.error(error.msg));
    }
  }, [loginErrors, user]);

  //Functions
  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(state));
    setState({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container" style={{ margin: "4rem 0" }}>
      <div className="screen">
        <div className="screen__content">
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              className: "",
              style: {
                fontSize: "14px",
              },
            }}
          />
          <form className="auth" onSubmit={handleSubmit}>
            <div className="auth__field">
              <AiOutlineMail className="auth__icon" />
              <input
                type="email"
                name="email"
                required
                className="auth__input"
                placeholder="Email"
                onChange={handleInputs}
                value={state.email}
              />
            </div>
            <div className="auth__field">
              <RiLockPasswordLine className="auth__icon" />
              <input
                type="password"
                name="password"
                required
                className="auth__input"
                placeholder="Password"
                onChange={handleInputs}
                value={state.password}
              />
            </div>
            <button className="button auth__submit" type="submit">
              {!loading ? (
                <span className="button__text">Log In </span>
              ) : (
                <span className="button__text">Loading... </span>
              )}
            </button>
          </form>
          <div className="social-auth">
            <h3>Log in via</h3>
            <div className="social-icons">
              <BsGoogle className="social-auth__icon" />
              <BsFacebook className="social-auth__icon" />
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}
