import React, {useEffect, useMemo, useState} from "react";
import {Col, Pagination, Result, Row, Skeleton} from "antd";
import {productApi} from "../../../api/productApi";
import ProductCard from "../../../components/ProductCard/ProductCard";

function ProductList() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false)
    const [page,setPage] = useState(1)
    useEffect(() => {
        const fetch = async () => {
            try {
                await productApi.getProduct(page).then((res) => {
                    setData(res);
                });
            } catch (e) {
            setError(true)
            }
        }
        fetch().then();
    }, [page]);


    const onchangePage =  (value) => {
        setPage(value)
        setData(null)
    };


    const render = useMemo(() => {
        if (error) return  <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
        />
        if (!data) return <Skeleton active/>
        return <>
            <Row gutter={[16, 16]}>{data.data.map((item, index) => (
                <Col key={index} lg={4} sm={12} md={8} xs={12}>
                    <ProductCard data={item}/>
                </Col>
            ))}</Row>
        </>
    }, [data,page])

    return (
        <div className={"product-list"}>
            <div className='product-list__content'>
                <h1>Tất cả sản phẩm của shop</h1>
                {render}
                <div className={"product-list__pagination"}>
                    <Pagination
                        defaultCurrent={1}
                        current={page}
                        pageSize={12}
                        total={data?.totalDocuments||30}
                        onChange={(value) => onchangePage(value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductList;
