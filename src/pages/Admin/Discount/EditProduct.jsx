import { Modal, Tabs, List, Checkbox, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { discountApi } from "../../../api/discountApi";

export default function EditProduct({
  on,
  off,
  data,
  checked,
  idEditDiscount,
  returnEdit,
}) {
  const [checkList, setCheckList] = useState(checked);
  const [idDiscount, setIdDiscount] = useState(idEditDiscount);
  const [loading, setLoading] = useState(false);
  const { TabPane } = Tabs;
  const renderTab = data?.map((item, index) => {
    const { name, list_product } = item;
    return (
      <TabPane tab={name} key={index}>
        <List
          dataSource={list_product}
          renderItem={(item, index) => {
            const { _id, name } = item;
            const checkIndex = checked.findIndex((item) => item._id === _id);
            return (
              <List.Item key={index}>
                <Checkbox
                  defaultChecked={checkIndex > -1}
                  onChange={(e) => handleCheck(e, item)}
                >
                  {name}
                </Checkbox>
              </List.Item>
            );
          }}
        />
      </TabPane>
    );
  });

  const handleCheck = (e, value) => {
    const { _id, name } = value;
    const data = checkList;

    if (!e.target.checked) {
      const index = data.findIndex((item) => item._id === _id);
      if (index > -1) {
        data.splice(index, 1);
        setCheckList(data);
      }
    } else {
      data.push(value);
      setCheckList(data);
    }
  };

  const onSubmitEdit = async () => {
    setLoading(true);
    await discountApi
      .updateDiscount({ _id: idDiscount, list: checkList })
      .then((res) => {
        setLoading(false);
        returnEdit(res);
        off(false);
      });
  };

  useEffect(() => {
    setCheckList(checked);
    setIdDiscount(idEditDiscount);
    return () => {
      setCheckList([]);
      setIdDiscount("");
    };
  }, [checked, idEditDiscount]);

  return (
    <Modal
      confirmLoading={loading}
      visible={on}
      onCancel={() => off(false)}
      onOk={onSubmitEdit}
    >
      <Typography.Title level={2}>Sửa sản phẩm</Typography.Title>
      <Tabs style={{ height: "60vh", overflowY: "scroll" }}>{renderTab}</Tabs>
    </Modal>
  );
}
