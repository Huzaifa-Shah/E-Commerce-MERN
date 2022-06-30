import React, { useState, useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";

//styles and components
import "../Admin.css";
import "./Setting.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { updateUserProfile } from "../../../store/asyncMethods/ProfileMethod";
import { updateUserPassword } from "../../../store/asyncMethods/ProfileMethod";
import { deleteUser } from "../../../store/asyncMethods/AuthMethod";
import { LOGOUT } from "../../../store/constants/AuthConstants";
import Loader from "../../../components/Loader/Loader";

export default function Setting({ history }) {
  //States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");

  //Reducers
  const { user, loading } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const userId = user._id;

  //UseEffect
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);

  //Functions
  const updateProfileHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, email, id: user._id }));
  };

  const updatePasswordHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserPassword({ currentPassword, password, id: user._id }));
    setCurrentPassword("");
    setPassword("");
  };

  const deleteAccountHandler = (e) => {
    history.push("/");
    dispatch(deleteUser(userId));
    dispatch({ type: LOGOUT });
  };

  return (
    <div className="container_profile">
      <div className="sidebar_panel">
        <Sidebar />
      </div>
      <div className="profile_panel">
        {!loading ? (
          <>
            <form onSubmit={updateProfileHandler}>
              <div className="row ml-minus-15 mr-minus-15">
                <div className="col-8 p-15">
                  <div className="create_card">
                    <h3 className="card_h3">Update Profile</h3>
                    <div className="group">
                      <label htmlFor="name">Update Name</label>
                      <input
                        type="text"
                        id="name"
                        className="group__control"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="email">Update Email</label>
                      <input
                        type="email"
                        id="email"
                        className="group__control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="group">
                      <button className="btn btn_status" type="submit">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <form onSubmit={updatePasswordHandler}>
              <div className="row ml-minus-15 mr-minus-15">
                <div className="col-8 p-15">
                  <div className="create_card">
                    <h3 className="card_h3">Update Password</h3>
                    <div className="group">
                      <label htmlFor="currentPassword">Current password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        className="group__control"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="password">Update password</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="group__control"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="group">
                      <button className="btn btn_status" type="submit">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Delete Account Functionality */}
            <div className="row ml-minus-15 mr-minus-15">
              <div className="col-8 p-15">
                <div className="create_card">
                  <h3 className="card_h3">Delete Account</h3>
                  <button className="btn_delete" onClick={deleteAccountHandler}>
                    DELETE ACCOUNT
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
