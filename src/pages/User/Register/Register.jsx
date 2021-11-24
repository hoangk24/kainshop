import React, { useCallback, useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../features/userSlice/userThunk";
import background from "../../../assets/img/background_login.jpg";

function Register() {
  const history = useHistory();
  const isLoading = useSelector((state) => state.user.isLoadingRegister);
  const sendMailSuccess = useSelector((state) => state.user.sendMailSuccess);
  const dispatch = useDispatch();
  const initialValues = {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };
  const onSubmit = useCallback((values) => {
    const { username, password, fullName, email } = values;
    const data = {
      username,
      password,
      fullName,
      email,
    };
    dispatch(register(data));
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  if (sendMailSuccess)
    return (
      <div
        className={"sendmail"}
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className='sendmail__content'>
          <h1>Thành công</h1>
          <p>
            Một email xác thực đã được gửi đến tài khoản của bạn.
            <br />
            Hãy xác thực email để sử dụng tài khoản.
          </p>
          <Link to={"/login"}>Quay lại đăng nhập</Link>
        </div>
      </div>
    );

  return (
    <div
      className={"register"}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className='register__content'>
        <div className='register-title'>
          <h1>Đăng ký</h1>
          <p>Hãy nhập thông tin của bạn để đăng ký</p>
        </div>
        <Form
          wrapperCol={{ span: 16 }}
          labelCol={{ span: 8 }}
          initialValues={initialValues}
          onFinish={onSubmit}
        >
          <Form.Item
            label={"FullName"}
            name={"fullName"}
            rules={[
              { required: true, message: "FullName không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Username"}
            name={"username"}
            rules={[
              { required: true, message: "Username không được để trống!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Password"}
            name={"password"}
            rules={[
              { required: true, message: "Password không được để trống!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={"Confirm Password"}
            name={"confirmPassword"}
            rules={[
              {
                required: true,
                message: "Xác nhận mật khẩu không được để trống!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue(["password"]) === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không trùng khớp!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label={"Email"}
            name={"email"}
            rules={[{ required: true, message: "Email không được để trống!" }]}
          >
            <Input type={"email"} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
            <Button
              style={{ marginRight: "1rem" }}
              onClick={() => history.push("/login")}
            >
              Đăng nhập
            </Button>
            <Button
              loading={isLoading ? true : false}
              type='primary'
              htmlType='submit'
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
