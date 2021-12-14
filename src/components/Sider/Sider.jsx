import { Menu, Skeleton} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {productApi} from "../../api/productApi";

function Sider() {
    const {SubMenu} = Menu;
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            try {
                await productApi.getCategory().then((res) => setCategory(res));
            } catch (e) {
                setError(true)
            }
        }
        fetch().then()
    }, []);


    return (
        <div className='sider activeSider'>
            <Menu className='sider-menu' color='dark' theme='dark' mode='inline'>
                <Menu.Item key={Math.random()}>
                    <Link to={"/"}>Home</Link>
                </Menu.Item>
                {!category?<Skeleton active/>:<>
                    {category.map((ele, index) => {
                        return (
                            <SubMenu key={index} title={ele.name}>
                                {ele.item.map((item) => (
                                    <Menu.Item key={Math.random()}>
                                        <Link to={`/product?nsx=${item.replaceAll(" ", "-")}`}>
                                            <span style={{textTransform: "capitalize"}}>{item}</span>
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        );
                    })}
                </>}

            </Menu>
        </div>
    );
}

export default Sider;
