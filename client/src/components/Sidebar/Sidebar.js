import React from "react";

//Depedencies
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//styles and components
import "./Sidebar.css";
import { AiFillHome } from "react-icons/ai";
import { IoCreate } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import { AiFillSetting } from "react-icons/ai";
import { MdInventory } from "react-icons/md";

export default function Sidebar() {
  const { user } = useSelector((state) => state.AuthReducer);
  return (
    <nav className="sidebar">
      <ul className="sidebar_ul">
        <Link to="/admin">
          <li>
            <AiFillHome className="sidebar_icon" />
            <span className="sidebar_title">Dashboard</span>
          </li>
        </Link>
        {user.isAdmin && (
          <Link to="/create_product">
            <li>
              <IoCreate className="sidebar_icon" />
              <span className="sidebar_title">Create Product</span>
            </li>
          </Link>
        )}
        {user.isAdmin && (
          <Link to="/inventory">
            <li>
              <MdInventory className="sidebar_icon" />
              <span className="sidebar_title">Inventory</span>
            </li>
          </Link>
        )}
        <Link to="/paidOrders">
          <li>
            <MdPending className="sidebar_icon" />
            <span className="sidebar_title">Orders</span>
          </li>
        </Link>
        {user.isAdmin && (
          <Link to="/">
            <li>
              <GrAnalytics className="sidebar_icon" />
              <span className="sidebar_title">Analytics</span>
            </li>
          </Link>
        )}
        <Link to="/update_profile">
          <li>
            <AiFillSetting className="sidebar_icon" />
            <span className="sidebar_title">Setting</span>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

<></>;
