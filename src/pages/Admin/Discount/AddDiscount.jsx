import {
  Modal,
  Form,
  Typography,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Tabs,
  List,
  Checkbox,
} from "antd";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { discountApi } from "../../../api/discountApi";

export default function AddDiscount({ visible, hidden, data, returnData }) {
  const { RangePicker } = DatePicker;
  const [checkList, setCheckList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { TabPane } = Tabs;
  const [form] = Form.useForm();
  const renderTab = data?.map((item, index) => {
    const { name, list_product } = item;
    return (
      <TabPane tab={name} key={index}>
        <List
          dataSource={list_product}
          renderItem={(item) => {
            const { _id, name } = item;
            return (
              <List.Item key={_id}>
                <Checkbox onChange={(e) => onCheckValue(e, item)}>
                  {name}
                </Checkbox>
              </List.Item>
            );
          }}
        />
      </TabPane>
    );
  });

  const onCheckValue = (e, value) => {
    const { checked } = e.target;
    const data = checkList;
    if (checked) {
      data.push(value);
      setCheckList(data);
    } else {
      const index = data.findIndex((item) => item._id === value._id);
      if (index > -1) {
        data.splice(index, 1);
      }
      setCheckList(data);
    }
  };

  const onSubmit = useCallback(
    async (value) => {
      const { name, percent, date } = value;
      const data = {
        name,
        percent,
        dateStart: moment(date[0]._d).format("YYYY/MM/DD"),
        dateEnd: moment(date[1]._d).format("YYYY/MM/DD"),
        list: checkList,
      };
      setLoading(true);
      await discountApi
        .addDiscount(data)
        .then((res) => {
          setLoading(false);
          returnData(res);
          form.resetFields();
          hidden(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    },
    [form]
  );
  return (
    <Modal
      confirmLoading={loading}
      visible={visible}
      onCancel={() => hidden(false)}
      onOk={() => form.submit()}
    >
      <Typography.Title level={2}>Thêm mới sản phẩm</Typography.Title>
      <Form
        form={form}
        onFinish={onSubmit}
        style={{ height: "60vh", overflowY: "scroll" }}
      >
        <Form.Item
          label='Tên khuyến mãi'
          name='name'
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <Input placeholder='Nhập tên khuyến mãi...' />
        </Form.Item>
        <Form.Item
          label='Tỷ lệ'
          name='percent'
          rules={[{ required: true, message: "Không được để trống!" }]}
        >
          <InputNumber defaultValue={1} min={1} max={100} />
        </Form.Item>
        <Form.Item label={"Thời gian"} name='date'>
          <RangePicker />
        </Form.Item>
        <Form.Item label='Danh sách sản phẩm'>
          <Tabs>{renderTab}</Tabs>
        </Form.Item>
      </Form>
    </Modal>
  );
}
