import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../../api/productApi";

function Sider() {
  const { SubMenu } = Menu;
  const [category, setCategory] = useState([]);
  const renderMenu = category?.map((ele, index) => {
    return (
      <SubMenu key={index} title={ele.name}>
        {ele.item.map((item) => (
          <Menu.Item key={Math.random()}>
            <Link to={`/product?nsx=${item.replaceAll(" ", "-")}`}>
              <span style={{ textTransform: "capitalize" }}>{item}</span>
            </Link>
          </Menu.Item>
        ))}
      </SubMenu>
    );
  });

  useEffect(async () => {
    await productApi.getCategory().then((res) => setCategory(res));
  }, []);

  return (
    <div className='sider activeSider'>
      <Menu className='sider-menu' color='dark' theme='dark' mode='inline'>
        <Menu.Item key={Math.random()}>
          <Link to={"/"}>Home</Link>
        </Menu.Item>
        {renderMenu}
      </Menu>
    </div>
  );
}
export default Sider;
