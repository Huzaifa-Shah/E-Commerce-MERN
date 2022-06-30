import React from "react";

//Depedencies
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function RouteLinks(props) {
  const { user } = useSelector((state) => state.AuthReducer);
  const { googleUser } = useSelector((state) => state.GoogleReducer);

  
  return ( user || googleUser) ? (
    <Redirect to="/admin" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
}
