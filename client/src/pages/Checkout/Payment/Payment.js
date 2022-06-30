import React, { useState } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";

//styles and components
import "./Payment.css";
import { savePaymentMethod } from "../../../store/asyncMethods/CartMethod";

export default function Payment({ history }) {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cartReducer);

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  //Functions
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder')
  };
  
  return (
    <div className="shipping_container">
      <form onSubmit={submitHandler}>
        <div className="row ml-minus-15 mr-minus-15">
          <div className="col-8 p-15">
            <div className="create_card">
              <h3 className="card_h3">Payment Method</h3>
              <h4 className="card_h4">Select Method</h4>
              <div className="payment_input_container">
                <input
                  type="radio"
                  checked
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="Paypal">PayPal or Credit Card</label>
              </div>

              {/* Further implementing other payment Methods */}
              {/* <div className="payment_input_container">
                <input
                  type="radio"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="Stripe">Stripe</label>
              </div> */}
              <div className="group">
                <button className="btn btn_status" type="submit">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
