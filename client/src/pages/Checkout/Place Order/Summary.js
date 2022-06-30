import React, { useEffect } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

//styles and components
import "./Summary.css";
import { createOrder } from "../../../store/asyncMethods/OrderMethod";
import { ORDER_CREATE_RESET } from "../../../store/constants/OrderConstants";
import Loader from "../../../components/Loader/Loader";

export default function Summary({ history }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);

  //Edge Cases
  if (!cart.shippingAddress) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/paymentMethod");
  }

  //Calculate Prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 50);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const { loading, success, order } = useSelector(
    (state) => state.OrderCartReducer
  );
  const { user } = useSelector((state) => state.AuthReducer);

  //Cleaning up
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    // eslint-disable-next-line
  }, [success, history, dispatch]);
  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        userId: user._id,
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      {!loading ? (
        <div className="summary_container">
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
          <div className="summary_content">
            <div className="summary_content_address">
              <h2 className="summary_title_h2">Shipping</h2>
              <p className="summary_subtitle">
                <strong style={{ fontWeight: "normal" }}>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div className="summary_content_payment">
              <h2 className="summary_title_h2">Payment Method</h2>
              <p className="summary_subtitle">
                <strong style={{ fontWeight: "normal" }}>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>
            <div className="summary_content_items">
              <h2 className="summary_title_h2">Order Items</h2>
              {cart.cartItems.length === 0
                ? toast.error("Your Cart is Empty")
                : cart.cartItems.map((item, index) => (
                    <div key={index} className="summary_item_container">
                      <div className="summary_item_image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="summary_item_name">
                        <Link to={`/details/${item.productId}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div className="summary_item_price">
                        {item.qty} x {item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className="summary_calculation">
            <h2 className="summary_title_h2">Order Summary</h2>
            <div className="summary_calculation_styles">
              <span>Items</span>
              <span>${cart.itemsPrice}</span>
            </div>
            <div className="summary_calculation_styles">
              <span>Shipping</span>
              <span>${cart.shippingPrice}</span>
            </div>
            <div className="summary_calculation_styles">
              <span>Tax</span>
              <span>${cart.taxPrice}</span>
            </div>
            <div className="summary_calculation_styles">
              <span>Total</span>
              <span>${cart.totalPrice}</span>
            </div>
            <div className="summary_calculation_btn">
              <button
                className="btn btn_status"
                onClick={placeOrderHandler}
                type="submit"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
