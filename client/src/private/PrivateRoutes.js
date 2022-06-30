import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = (props) => {
  const { user } = useSelector((state) => state.AuthReducer);
  const { googleUser } = useSelector((state) => state.GoogleReducer);
  
  return (user || googleUser) ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};

export default PrivateRoute;
