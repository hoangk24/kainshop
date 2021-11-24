import React, { useEffect, useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../features/userSlice/userThunk";
import background from "../../../assets/img/background_login.jpg";
function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoadingLogin);
  const history = useHistory();
  const onFinish = (values) => {
    dispatch(login(values));
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (localStorage.getItem("user")) {
      history.push("/account");
    }
  }, [localStorage.getItem("user")]);

  return (
    <div className='login' style={{ backgroundImage: `url(${background})` }}>
      <div className='login__content'>
        <h1 className='login-title'>Đăng nhập</h1>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={{ display: "block", width: "100%" }}
              loading={isLoading ? true : false}
              type='primary'
              htmlType='submit'
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          Chưa có tài khoản!
          <Link to={"/register"}> Đăng ký ngay</Link>
        </div>
        <Link
          style={{ textAlign: "center", display: "block" }}
          to={"/recover-password"}
        >
          Quên mật khẩu
        </Link>
      </div>
    </div>
  );
}

export default Login;
