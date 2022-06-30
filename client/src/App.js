//Depedencies
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

//Components and styles
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Store from "./store";
import RouteLinks from "./private/RouteLinks";
import PrivateRoute from "./private/PrivateRoutes";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Create from "./pages/Admin/Create Products/Create";
import Product from "./pages/Home/Product_Details/Product";
import Cart from "./pages/Cart/Cart";
import Shipping from "./pages/Checkout/Shipping/Shipping";
import Payment from "./pages/Checkout/Payment/Payment";
import Summary from "./pages/Checkout/Place Order/Summary";
import Setting from "./pages/Admin/Setting/Setting";
import Order from "./pages/Checkout/Order/Order";
import PaidOrder from "./pages/Admin/Paid Orders/PaidOrder";
import TOC from './pages/Admin/TOC/TOC'
import Inventory from "./pages/Admin/Inventory/Inventory";
import Edit from "./pages/Admin/Edit Product/Edit";

export default function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/details/:id" exact component={Product} />
          <Route path="/home/:page" exact component={Home} />
          <Route path='/cart/:id?' exact component={Cart} /> 
          <RouteLinks path="/register" exact component={Register} />
          <RouteLinks path="/login" exact component={Login} />
          <PrivateRoute path="/admin" exact component={Admin} />
          <PrivateRoute path="/create_product" exact component={Create} />
          <PrivateRoute path="/update_profile" exact component={Setting} />
          <PrivateRoute path="/shipping" exact component={Shipping} />
          <PrivateRoute path="/payment" exact component={Payment} />
          <PrivateRoute path="/placeorder" exact component={Summary} />
          <PrivateRoute path='/order/:id'exact component={Order} />
          <PrivateRoute path='/paidOrders' exact component={PaidOrder} />
          <PrivateRoute path='/TOC' exact component={TOC} />
          <PrivateRoute path='/inventory' exact component={Inventory}/>
          <PrivateRoute path='/editProduct/:id' exact component={Edit} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
