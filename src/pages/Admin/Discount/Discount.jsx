import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Typography,
  Button,
  InputNumber,
  DatePicker,
  Tabs,
  Tag,
  message,
} from "antd";
import AddDiscount from "./AddDiscount";
import { productApi } from "../../../api/productApi";
import { discountApi } from "../../../api/discountApi";
import moment from "moment";
import EditProduct from "./EditProduct";
export default function Discount() {
  const [loading, setLoading] = useState(false);
  const [newDiscount, setNewDiscount] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [checkedData, setCheckedData] = useState([]);
  const [product_data, setProduct_data] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [idEditDiscount, setIdEditDiscount] = useState("");
  const { Column } = Table;
  const { RangePicker } = DatePicker;
  const { TabPane } = Tabs;

  const updateDiscount = async (data) => {
    setLoading(true);
    await discountApi
      .updateDiscount(data)
      .then((res) => {
        setDiscount(res);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const applyDiscount = async (id) => {
    setLoading(true);
    await discountApi
      .applyDiscount(id)
      .then(async (res) => {
        await fetchDiscount();
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const deleteDiscount = async (id) => {
    setLoading(true);
    await discountApi.removeDiscount(id).then((res) => {
      setDiscount(res);
      setLoading(false);
    });
  };

  const fetchDiscount = async () => {
    await discountApi.getDiscount().then((res) => {
      setDiscount(res);
      setLoading(false);
    });
  };

  useEffect(async () => {
    setLoading(true);
    await productApi.getProductGroup().then((res) => {
      setProduct_data(res);
    });
    fetchDiscount();
  }, []);
  return (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      <Typography.Title>Quản lý khuyến mãi</Typography.Title>
      <Tabs>
        <TabPane tab='Khuyến mãi theo thời gian' key={1}>
          <Space>
            <Button onClick={() => setNewDiscount(true)}>
              Thêm mới khuyến mãi
            </Button>
          </Space>
          <Table loading={loading} dataSource={discount}>
            <Column
              title='Tên khuyến mãi'
              dataIndex='name'
              key='name'
              render={(text, record) => {
                const { _id } = record;
                return (
                  <Typography.Paragraph
                    editable={{
                      onChange: (string) =>
                        updateDiscount({ _id, name: string }),
                    }}
                  >
                    {text}
                  </Typography.Paragraph>
                );
              }}
            />
            <Column
              title='Tỷ lệ'
              dataIndex='percent'
              key='percent'
              render={(text, record) => {
                const { percent, _id } = record;
                return (
                  <InputNumber
                    onChange={(value) =>
                      updateDiscount({ _id, percent: value })
                    }
                    defaultValue={percent}
                  />
                );
              }}
            />
            <Column
              title='Thời gian'
              dataIndex='dateStart'
              key='dateStart'
              render={(text, record) => {
                const { dateStart, dateEnd, _id } = record;
                return (
                  <div>
                    <span>{moment(dateStart).format("DD/MM/YYYY")} - </span>
                    <span>{moment(dateEnd).format("DD/MM/YYYY")}</span>

                    <RangePicker
                      onChange={(date) =>
                        updateDiscount({
                          _id,
                          dateStart: moment(date[0]._d),
                          dateEnd: moment(date[1]._d),
                        })
                      }
                    />
                  </div>
                );
              }}
            />
            <Column
              title='Danh sách sản phẩm'
              dataIndex='list'
              key='list'
              render={(text, record) => {
                const { list, _id } = record;
                const renderList = list.map((item, index) => (
                  <Tag key={index}>{item.name}</Tag>
                ));
                return (
                  <>
                    {renderList}
                    <a
                      onClick={() => {
                        setIdEditDiscount(_id);
                        setCheckedData(list);
                        setEditProduct(true);
                      }}
                    >
                      Sửa
                    </a>
                  </>
                );
              }}
            />
            <Column
              title='Áp dụng'
              dataIndex='isApply'
              key='isApply'
              render={(text, record) => {
                const { dateEnd, isApply, _id } = record;
                const checkDate = moment(dateEnd).isAfter(Date.now());
                return (
                  <div>
                    {checkDate ? (
                      <div>
                        {isApply ? (
                          <Tag color='green'>Đang áp dụng</Tag>
                        ) : (
                          <>
                            <Tag color='blue'>Chưa áp dụng</Tag>
                            <a
                              style={{ display: "block" }}
                              onClick={() => applyDiscount(_id)}
                            >
                              Áp dụng ngay
                            </a>
                          </>
                        )}
                      </div>
                    ) : (
                      <Tag color='red'>Hết hạn</Tag>
                    )}
                  </div>
                );
              }}
            />
            <Column
              title='Thao tác'
              render={(text, record) => {
                const { _id } = record;
                return <a onClick={() => deleteDiscount(_id)}>Xoá</a>;
              }}
            />
          </Table>
          <AddDiscount
            visible={newDiscount}
            hidden={setNewDiscount}
            data={product_data}
            returnData={setDiscount}
          />
          {editProduct ? (
            <EditProduct
              on={editProduct}
              off={setEditProduct}
              data={product_data}
              checked={checkedData}
              idEditDiscount={idEditDiscount}
              returnEdit={setDiscount}
            />
          ) : null}
        </TabPane>
        <TabPane tab='Khuyến mãi theo mã' key={2}></TabPane>
      </Tabs>
    </div>
  );
}
