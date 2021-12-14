import React, {useEffect, useMemo, useState} from "react";
import {productApi} from "../../../api/productApi";
import {Col, Result, Row, Skeleton} from "antd";
import {useHistory} from "react-router-dom";
import Loading from "../../Loading/Loading";

function TradeMark(props) {
    const history = useHistory();
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                await productApi.getCategory().then((res) => {
                    setCategory(res);
                })
            } catch (e) {
                setError(true)
            }
        }
        fetch().then()
    }, [category]);

    const render = useMemo(()=>{
        if(error) return  <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
        />
        if(!category) return  <Skeleton active/>
        return  <Row gutter={[16, 16]}>{ category?.map((item, index) => (
            <Col lg={8} sm={8} xs={12} key={index}>
                <div
                    className={"trademark-item"}
                    onClick={() => history.push(`/product?category=${item.name}`)}
                >
                    {item.name}
                </div>
            </Col>
        ))}</Row>
    },[category])
    return (
        <div className={"trademark"}>
            <div className='trademark__content'>
                <h1 className={"trademark-title"}>Danh mục sản phẩm</h1>
                {render}
            </div>
        </div>
    );
}

export default TradeMark;
