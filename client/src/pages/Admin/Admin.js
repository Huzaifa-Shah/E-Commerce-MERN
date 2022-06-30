import React from "react";

//Dependencies
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//styles and components
import "./Admin.css";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Admin() {
  const { user } = useSelector((state) => state.AuthReducer);
  return (
    <div className="container_admin">
      <div className="sidebar_panel">
        <Sidebar />
      </div>
      <div className="admin_panel">
        <div>
          <h2>My Profile</h2>
          <div>
            <span className="profile_title">Full Name:</span>
            <span className="profile_title_info">{user.name}</span>
          </div>
          <div>
            <span className="profile_title">Email Address: </span>
            <span className="profile_title_info">{user.email}</span>
          </div>
          <h3>Status</h3>
          {!user.isAdmin ? (
            <div>
              <p className="profile_title">
                Customer: <span style={{ color: "green" }}>Yes</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="profile_title">
                Admin: <span style={{ color: "green" }}>Yes</span>
              </p>
              <p className="profile_title">
                Customer: <span style={{ color: "green" }}>Yes</span>
              </p>
            </div>
          )}
        </div>
        <div className="profile_btn">
          <Link className="btn btn_status" to='/update_profile'>Update Profile</Link>
        </div>
      </div>
    </div>
  );
}
