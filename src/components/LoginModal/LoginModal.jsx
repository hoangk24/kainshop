import React, { useState } from "react";
import { Modal, Form, Input, Typography } from "antd";
export default function LoginModal() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Modal visible confirmLoading={loading}>
      <Typography.Title style={{ textAlign: "center" }} level={2}>
        Đăng nhập
      </Typography.Title>
      <Form>
        <Form.Item
          label='Tài khoản'
          rules={[
            { required: true, message: "Tài khoản không được để trống!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Mật khẩu'
          rules={[{ required: true, message: "Mật khẩu không được để trống!" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}
