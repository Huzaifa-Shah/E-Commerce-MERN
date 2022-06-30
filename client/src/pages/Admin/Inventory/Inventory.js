import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//styles and components
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import { getUserProducts, deleteUserProduct } from "../../../store/asyncMethods/ProductMethod";
import { LOGOUT } from "../../../store/constants/AuthConstants";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

export default function Inventory({ history }) {
  //Reducer
  const { user } = useSelector((state) => state.AuthReducer);
  const { userProducts, loading } = useSelector(
    (state) => state.GetUserProductReducer
  );
  const userId = user._id;
  const dispatch = useDispatch();

  //UseEffect
  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      dispatch(getUserProducts(userId));
    }
  }, [dispatch, user, userId, history]);


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
                <div className="table-content">
                  {userProducts.map((products) => (
                    <div className="table-row" key={products._id}>
                      <div className="table-data">{products._id}</div>
                      <div className="table-data">{products.name}</div>
                      <div className="table-data">$ {products.price}</div>
                      <div className="table-data">{products.brand}</div>
                      <div className="table-data">{products.countInStock}</div>
                      <div className="table-data">
                        <Link to={`/editProduct/${products._id}`}>
                          <AiTwotoneEdit style={{ fontSize: "2rem" }} />
                        </Link>
                      </div>
                      <div className="table-data">
                        <Link to='/' onClick={(e) => {
                          e.preventDefault()
                          dispatch(deleteUserProduct(products._id))
                          dispatch({ type: LOGOUT });
                        }}>
                          <AiFillDelete
                            style={{ fontSize: "2rem", color: "red" }}
                          />
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
