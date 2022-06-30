import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { AuthReducer, GoogleReducer, deleteUserReducer, updateAdminReducer } from "./reducers/AuthReducer";
import { homeProducts, getProduct, CreateProductReducer, GetUserProductReducer, UpdateProductReducer } from "./reducers/ProductReducer";
import { cartReducer } from "./reducers/CartReducer";
import { UpdateProfileReducer } from "./reducers/ProfileReducer";
import {
  OrderCartReducer,
  OrderDetailsReducer,
  OrderPayReducer,
  OrderListMyReducer,
} from "./reducers/OrderReducer";

const rootReducers = combineReducers({
  AuthReducer,
  GoogleReducer,
  deleteUserReducer,
  homeProducts,
  getProduct,
  CreateProductReducer,
  cartReducer,
  UpdateProfileReducer,
  OrderCartReducer,
  OrderDetailsReducer,
  OrderPayReducer,
  OrderListMyReducer,
  updateAdminReducer,
  GetUserProductReducer,
  UpdateProductReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cartReducer: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
};

const middlewares = [thunkMiddleware];
const Store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default Store;
