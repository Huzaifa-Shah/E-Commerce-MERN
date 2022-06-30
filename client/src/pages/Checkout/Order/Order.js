import React, { useEffect, useState } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

//styles and components
import "../Place Order/Summary.css";
import {
  getOrderDetails,
  payOrder,
} from "../../../store/asyncMethods/OrderMethod";
import Loader from "../../../components/Loader/Loader";
import Message from "../../../components/Message/Message";
import { ORDER_PAY_RESET } from "../../../store/constants/OrderConstants";

export default function Order({ match, history }) {
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();

  //Reducer (UseSelector)
  const { loading, order } = useSelector((state) => state.OrderDetailsReducer);
  const { user } = useSelector((state) => state.AuthReducer);
  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.OrderPayReducer
  );

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/user/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || orderId !== order._id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, history, user, successPay, order]);

  //Functions
  const SuccessPaymentHandler = (paymentResult) => {
    // console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

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
              <h1>Order {order._id}</h1>
              <h2 className="summary_title_h2">Shipping</h2>
              <p className="summary_subtitle">
                <strong>Name: </strong> {order.user.name}
              </p>
              <p className="summary_subtitle" style={{ marginBottom: "1rem" }}>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p className="summary_subtitle">
                <strong style={{ fontWeight: "normal" }}>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              <p style={{ marginTop: "2rem" }}>
                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">Not Delivered</Message>
                )}
              </p>
            </div>
            <div className="summary_content_payment">
              <h2 className="summary_title_h2">Payment Method</h2>
              <p className="summary_subtitle">
                <strong style={{ fontWeight: "normal" }}>Method: </strong>
                {order.paymentMethod}
              </p>
              <p style={{ marginTop: "2rem" }}>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </p>
            </div>
            <div className="summary_content_items">
              <h2 className="summary_title_h2">Order Items</h2>
              {order.orderItems.length === 0
                ? toast.error("Your Cart is Empty")
                : order.orderItems.map((item, index) => (
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
              <span>${order.itemsPrice}</span>
            </div>
            <div className="summary_calculation_styles">
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
            </div>
            <div className="summary_calculation_styles">
              <span>Tax</span>
              <span>${order.taxPrice}</span>
            </div>
            <div className="summary_calculation_styles">
              <span>Total</span>
              <span>${order.totalPrice}</span>
            </div>
          <div className="summary_calculation_btn" style={{margin: '2rem 1rem'}}>
            {!order.isPaid && (
              <>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={SuccessPaymentHandler}
                  />
                )}
              </>
            )}
          </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
