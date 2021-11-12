import { Layout, Menu } from "antd";
import React from "react";
import {Link} from "react-router-dom";
import {DropboxOutlined, UnorderedListOutlined, UserOutlined} from "@ant-design/icons";

export default function SiderAdmin() {
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    return (
        <div className='sider activeSider'>
            <Menu className='sider-menu' color='dark' theme='dark' mode='inline'>
                <Menu.Item icon={<UserOutlined/>}>
                    <Link to={'/account'}>Quản lý tài khoản</Link>
                </Menu.Item>
                <Menu.Item icon={<DropboxOutlined />}>
                    <Link to={'/product-admin'}>Quản lý mặt hàng</Link>
                </Menu.Item>
                <Menu.Item icon={<UnorderedListOutlined />}>
                    <Link to={'/cart-admin'}>Quản lý đơn hàng</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}
