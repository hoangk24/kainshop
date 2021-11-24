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
import { Link } from "react-router-dom";
import { log_out } from "../../features/userSlice/userSlice";
import UserInfo from "./UserInfo/UserInfo";
function Header() {
  const history = useHistory();
  const isLogin = useSelector((state) => state.user.isLogin);
  const user = useSelector((state) => state.user.user);
  const countCart = useSelector((state) => state.user.countCart);
  const [UserInfoVisible, setUserInfoVisible] = useState(false);
  const { Search } = Input;
  const { Header } = Layout;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(log_out());
  };
  const onSearch = (value) => history.push(`/search?keyword=${value}`);
  const menuServices = (
    <Menu>
      <Menu.Item key='1' onClick={() => setUserInfoVisible(true)}>
        Quản lí thông tin
      </Menu.Item>
      <Menu.Item key='2'>
        <Link to='/cart-history'>Lịch sử mua hàng</Link>
      </Menu.Item>
      <Menu.Item key='3' onClick={() => handleLogout()}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const closeUserInfoModal = () => {
    setUserInfoVisible(false);
  };

  const menuExc = (
    <Menu>
      <Menu.Item key={1}>
        <Link to='/login'>Đăng nhập</Link>
      </Menu.Item>
      <Menu.Item key={2}>
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
        <Link to='/'>KAIN</Link>
      </h1>
      <div className='header__search ml-auto'>
        <Button className={"button"} icon={<SearchOutlined />} />
        <Search
          placeholder={"Search"}
          className={"search"}
          onSearch={onSearch}
        />
      </div>
      <Badge count={countCart} showZero className={"header__cart"}>
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
      )}
      <UserInfo
        user={user}
        visible={UserInfoVisible}
        closeModal={closeUserInfoModal}
      />
    </Header>
  );
}

export default Header;
