import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../../container/PrivateRoute";
import admin from "../../routes/admin";
import user from "../../routes/user";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from "../../pages/NotFound/NotFound";
import { UserLayout } from "../../container/AppLayout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function App() {
  const socketIo = useSelector((state) => state.user.socketIo);
  const renderAdminRoute = admin.map((item, index) => (
    <PrivateRoute
      key={index}
      path={item.path}
      exact={item.exact}
      component={item.component}
    />
  ));
  const renderUserRoute = user.map((item, index) => (
    <Route
      key={index}
      path={item.path}
      exact={item.exact}
      component={item.component}
    />
  ));
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    return () => {
      socketIo.emit("disconnect");
    };
  }, [socketIo]);
  return (
    <Router>
      <UserLayout>
        {renderUserRoute}
        {renderAdminRoute}
        <Route path='/*' component={NotFound} />
      </UserLayout>
    </Router>
  );
}
export default App;
