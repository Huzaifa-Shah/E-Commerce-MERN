import React, { useEffect, useState } from "react";

//Depedencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { GoogleLogin } from "react-google-login";

//styles and components
import "./Register.css";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { BsGoogle } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { userRegister } from "../../store/asyncMethods/AuthMethod";
import {
  GOOGLE_ERRORS,
  GOOGLE_TOKEN,
  GOOGLE_USER,
} from "../../store/constants/AuthConstants";

export default function Register() {
  //Hooks
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, registerErrors, user } = useSelector(
    (state) => state.AuthReducer
  );

  useEffect(() => {
    if (registerErrors.length > 0) {
      registerErrors.map((error) => toast.error(error.msg));
    }
  }, [registerErrors, user]);

  //Functions
  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(state));
    setState({
      name: "",
      email: "",
      password: "",
    });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(res)
    try {
      dispatch({ type: GOOGLE_TOKEN, payload: token });
      dispatch({ type: GOOGLE_USER, payload: result });
    } catch (error) {
      console.log(error)
      dispatch({ type: GOOGLE_ERRORS, payload: error });
    }
  };
  const googleFailure = () => {
    console.log("Google Auth Failure");
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
              <AiOutlineUser className="auth__icon" />
              <input
                type="text"
                name="name"
                className="auth__input"
                placeholder="Username"
                onChange={handleInputs}
                value={state.name}
              />
            </div>
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
                <span className="button__text">Sign In </span>
              ) : (
                <span className="button__text">Loading... </span>
              )}
            </button>
          </form>
          <div className="social-auth">
            <h3>Sign in via</h3>
            <div className="social-icons">
              <GoogleLogin
                clientId="557403828735-pajpih61dgtgnoq2umjn14mncs4pmakd.apps.googleusercontent.com"
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="social_btn"
                  >
                    <BsGoogle className="social-auth__icon" />
                  </button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />

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
