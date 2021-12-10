import React, { useCallback, useEffect, useRef, useState } from "react";
import { Select, Form, Input, Button, Space } from "antd";
import { addressApi } from "../../api/addressApi";
import { useDispatch } from "react-redux";
import { updateInfomation } from "../../features/userSlice/userThunk";
export default function Address({ closeEditMode }) {
  const [city, setCity] = useState([]);
  const [citySelected, setCitySelected] = useState("");
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const renderCity = city?.map((item, index) => (
    <Option key={index} value={item}>
      {item}
    </Option>
  ));

  const changeCity = async (value) => {
    setCitySelected(value);
    await addressApi.getDistrict(value).then((res) => {
      setDistrict(res);
    });
  };

  const renderDistrict = district?.map((item, index) => (
    <Option key={index} value={item}>
      {item}
    </Option>
  ));
  const changeDistrict = async (value) => {
    await addressApi.getWard(citySelected, value).then((res) => {
      setWard(res);
    });
  };

  const renderWard = ward?.map((item, index) => (
    <Option key={index} value={item}>
      {item}
    </Option>
  ));

  const submitForm = (values) => {
    const { living, ward, district, city } = values;
    const addressString = `${living}, ${ward}, ${district}, ${city}`;
    dispatch(updateInfomation({ address: addressString }));
    closeEditMode();
  };

  const onFinish = useCallback(() => {
    form.submit();
  }, [form]);

  useEffect(async () => {
    setLoading(true);
    await addressApi.getCity().then((res) => {
      setCity(res);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <Form form={form} onFinish={submitForm} labelCol={{ span: 5 }}>
        <Form.Item name='city' label='Tỉnh'>
          <Select onChange={changeCity} loading={loading}>
            {renderCity}
          </Select>
        </Form.Item>
        <Form.Item name='district' label='Huyện'>
          <Select onChange={changeDistrict}>{renderDistrict}</Select>
        </Form.Item>
        <Form.Item label='Phường' name='ward'>
          <Select>{renderWard}</Select>
        </Form.Item>
        <Form.Item label='Địa chỉ cụ thể' name='living'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={() => closeEditMode()}>Cancel</Button>
            <Button onClick={onFinish}>Submit</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
