import React, { useEffect, useState } from "react";

import { Layout } from "antd";
import Header from "../components/Header/Header";
import Sider from "../components/Sider/Sider";
import SiderAdmin from "../components/Sider/SiderAdmin";
import { Switch } from "react-router";
import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";

export const UserLayout = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  return (
    <Layout className='wrapper'>
      <Header />
      <Layout>
        {isLogin && isAdmin ? <SiderAdmin /> : <Sider />}
        <div className='content'>
          <div className='top'>
            <Switch>{children}</Switch>
          </div>
          <Footer />
        </div>
      </Layout>
    </Layout>
  );
};

export const AdminLayout = ({ children }) => (
  <Layout className='wrapper'>
    <Header />
    <Layout>
      <SiderAdmin />
      <div className='content'>
        {children}
        <div className='footer'>Copyright and design by Hoàng</div>
      </div>
    </Layout>
  </Layout>
);
