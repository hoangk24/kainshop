import React, { useCallback, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { userApi } from "../../../api/userApi";
import { Link, useLocation } from "react-router-dom";

function RecoverPasswordSuccess() {
  const [success, setSuccess] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const submitPassword = useCallback(async (values) => {
    setButtonLoading(true);
    await userApi
      .recover_password_success(query.get("accessToken"), values.newPassword)
      .then((res) => {
        setTimeout(() => {
          setButtonLoading(false);
          message.success("Đổi mật khẩu thành công");
          setSuccess(true);
        }, 1500);
      })
      .catch((e) => {
        message.error(e.response.data);
        setButtonLoading(false);
      });
  });
  return (
    <div className={"recoverPassword_success"}>
      {success ? (
        <div className={"recoverPassword__content"}>
          <h1>Thông báo</h1>
          <p>Bạn đã cật nhật mật khẩu thành công</p>
          <Link to={"/login"}>Đăng nhập ngay</Link>
        </div>
      ) : (
        <div className={"recoverPassword__content"}>
          <h1>Cật nhật mật khẩu</h1>
          <Form
            onFinish={submitPassword}
            initialValues={initialValues}
            wrapperCol={{ span: 14 }}
            labelCol={{ span: 10 }}
          >
            <Form.Item
              name={"newPassword"}
              label={"Mật khẩu mới"}
              rules={[
                { required: true, message: "Mật khẩu không được để trống" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name={"confirmPassword"}
              label={"Xác nhận mật khẩu"}
              rules={[
                {
                  required: true,
                  message: "Xác nhận khẩu không được để trống",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue(["newPassword"]) === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Mật khẩu xác nhận không trùng khớp!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5, span: 14 }}>
              <Button loading={buttonLoading} type='primary' htmlType='submit'>
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}

export default RecoverPasswordSuccess;
