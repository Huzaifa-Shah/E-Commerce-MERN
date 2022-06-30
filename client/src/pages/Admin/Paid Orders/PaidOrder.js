import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//styles and components
import "../Admin.css";
import "./PaidOrder.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import { listMyOrders } from "../../../store/asyncMethods/OrderMethod";
import { GiCrossMark } from "react-icons/gi";

export default function Setting({ history }) {
  //Reducer
  const { user } = useSelector((state) => state.AuthReducer);
  const userId = user._id;
  const { loading, orders } = useSelector((state) => state.OrderListMyReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      dispatch(listMyOrders(userId));
    }
  }, [dispatch, user, history, userId]);

  return (
    <div className="container_profile">
      <div className="sidebar_panel">
        <Sidebar />
      </div>
      <div className="profile_panel">
        {!loading ? (
          <>
            <div className="table_container">
              <div className="table">
                <div className="table-header">
                  <div className="header__item">
                    <p className="filter__link">ID</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">DATE</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">TOTAL</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">PAID</p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number">
                      DELIVERED
                    </p>
                  </div>
                  <div className="header__item">
                    <p className="filter__link filter__link--number"></p>
                  </div>
                </div>
                <div className="table-content">
                  {orders.map((order) => (
                    <div className="table-row" key={order._id}>
                      <div className="table-data">{order._id}</div>
                      <div className="table-data">
                        {order.createdAt.substring(0, 10)}
                      </div>
                      <div className="table-data">$ {order.totalPrice}</div>
                      <div className="table-data">
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <GiCrossMark style={{ color: "red" }} />
                        )}
                      </div>
                      <div className="table-data">
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <GiCrossMark style={{ color: "red" }} />
                        )}
                      </div>
                      <div className="table-data">
                        <Link to={`/details/${order._id}`}>
                          <button className="btn">DETAILS</button>
                        </Link>
                      </div>
                    </div>
                  ))}
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
