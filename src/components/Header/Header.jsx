import React, { useEffect, useState } from "react";
import { Badge, Button, Dropdown, Input, Layout, Menu, Space } from "antd";
import {
  BarsOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserServices from "../../helper/userLocal";
import { log_out } from "../../features/userSlice/userThunk";
import { Link } from "react-router-dom";
function Header() {
  const history = useHistory();
  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.user);
  const countCart = useSelector((state) => state.user.countCart);
  const { Search } = Input;
  const { Header } = Layout;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(log_out({ idUser: user._id, cart: UserServices.getUserCart() }));
  };
  const menuServices = (
    <Menu>
      <Menu.Item key='1'>Quản lí thông tin</Menu.Item>
      <Menu.Item key='2'>Lịch sử mua hàng</Menu.Item>
      <Menu.Item key='3' onClick={() => handleLogout()}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const menuExc = (
    <Menu>
      <Menu.Item>
        <Link to='/login'>Đăng nhập</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/register'>Đăng ký</Link>
      </Menu.Item>
    </Menu>
  );
  const showMenu = () => {
    document.querySelector(".sider").classList.toggle("activeSider");
  };

  return (
    <Header className={"header"}>
      <Button
        className={"header__bar"}
        onClick={() => showMenu()}
        icon={<BarsOutlined />}
      />
      <h1 className={"header__logo"}>
        <Link to='/'>KAIN SHOP</Link>
      </h1>
      <div className='header__search ml-auto'>
        <Button className={"button"} icon={<SearchOutlined />} />
        <Search placeholder={"Search"} className={"search"} />
      </div>
      <Badge count={countCart} showZero className={"header__cart"}>
        {/* <Button
          onClick={() => history.push("/cart")}
          icon={<ShoppingCartOutlined />}
        /> */}
        <a href='/cart'>
          <ShoppingCartOutlined style={{ fontSize: "2rem" }} />
        </a>
      </Badge>
      {isLogin ? (
        <Dropdown overlay={menuServices} trigger={["click"]}>
          <div className={"header__services"}>
            <div className={"avatar"}>
              <img src={user.avatar} alt='' />
            </div>
            <span className={"name"}>{user.fullName}</span>
          </div>
        </Dropdown>
      ) : (
        <div className='ml-auto'>
          <Space>
            <Button
              className='user-button'
              onClick={() => history.push("/login")}
            >
              Đăng nhập
            </Button>
            <Button
              className='user-button'
              onClick={() => history.push("/register")}
            >
              Đăng ký
            </Button>
            <Dropdown
              className='user-dropdown'
              overlay={menuExc}
              trigger={["click"]}
            >
              <Button icon={<UserOutlined />}></Button>
            </Dropdown>
          </Space>
        </div>
      )}
    </Header>
  );
}

export default Header;