import React, { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { AdminLayout } from "./AppLayout";
import UserServices from "../helper/userLocal";
import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          localStorage.getItem("user") &&
          UserServices.getUserInfo().role === 1
        )
          return <Component {...props} />;
        else if (
          localStorage.getItem("user") &&
          UserServices.getUserInfo().role === 0
        ) {
          return <Redirect to={"/"} />;
        } else return <Redirect to={"/login"} />;
      }}
    />
  );
}

export default PrivateRoute;
