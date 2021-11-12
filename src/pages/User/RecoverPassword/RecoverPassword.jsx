import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import { userApi } from "../../../api/userApi";

function RecoverPassword() {
  const history = useHistory();
  const [buttonLoading, setButtonLoading] = useState(false);
  const onFinish = async (values) => {
    setButtonLoading(true);
    await userApi
      .recover_password_send(values.email)
      .then((res) => {
        setButtonLoading(false);
        message.success("Email xác nhận đã đã được gửi vào email bạn!");
      })
      .catch((e) => {
        setButtonLoading(false);
        message.error(e.response.data());
      });
  };
  return (
    <div className={"recoverPassword"}>
      <div className='recoverPassword__content'>
        <div className='recoverPassword-title'>
          <h1> Lấy lại mật khẩu</h1>
          <p>Hãy nhập email của tài khoản để lấy lại mật khẩu</p>
        </div>

        <Form onFinish={onFinish}>
          <Form.Item
            label={"Email"}
            name={"email"}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input type={"email"} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 3 }}>
            <Button
              onClick={() => history.push("/login")}
              style={{ marginRight: "1rem" }}
            >
              Hủy
            </Button>
            <Button loading={buttonLoading} type='primary' htmlType='submit'>
              Gửi mã xác thực
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RecoverPassword;
