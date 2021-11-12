import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { adminApi } from "../../../api/adminApi";

function Account() {
  const [isLoading, setIsLoading] = useState(false);
  const [currenPage, setCurrenPage] = useState(1);
  const [data, setData] = useState({});
  const { account, page, totalDocuments } = data;
  const { Option } = Select;
  const { Column } = Table;
  const { Search } = Input;
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const fetchAccount = async () => {
    const res = await adminApi.getAllUser();
    setData(res);
    setCurrenPage(res.page);
  };
  const onSubmit = useCallback(async (values) => {
    const user = {
      username: values.username,
      password: values.password,
      email: values.email,
      fullName: values.fullName,
    };
    await adminApi
      .addAccount(user)
      .then((res) => {
        handleChangePage(page);
        closePopup();
      })
      .catch((e) => {
        message.error(e.response.data);
      });
  });

  const closePopup = useCallback(() => {
    form.resetFields();
    setIsOpen(false);
  }, [form]);

  const { Title } = Typography;
  const initialValues = {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const handleChangePage = async (page) => {
    setIsLoading(true);
    const res = await adminApi.getAllUser(page);
    setData(res);
    setCurrenPage(res.page);

    setIsLoading(false);
  };

  const deleteAccount = async (id) => {
    setIsLoading(true);
    await adminApi
      .deleteUser(id)
      .then((res) => {
        setIsLoading(false);
        message.success("Xóa tài khoản thành công!");
        handleChangePage(currenPage);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  const updateStateAccount = async (id, lock) => {
    setIsLoading(true);
    await adminApi
      .updateStateAccount(id, lock)
      .then((res) => {
        setIsLoading(false);
        message.success(res);
        handleChangePage(currenPage);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div className={"account"}>
      <Title className={"account__title"}>Quản lý tài khoản</Title>
      <Space style={{ marginBottom: "1rem" }}>
        <Search />
        <Button onClick={() => setIsOpen(true)} icon={<UserOutlined />}>
          Thêm tài khoản{" "}
        </Button>
        <Modal visible={isOpen} onOk={form.submit} onCancel={closePopup}>
          <h1 style={{ textAlign: "center" }}>Tạo mới tài khoản</h1>
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={onSubmit}
            style={{ paddingTop: "1rem" }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 15 }}
          >
            <Form.Item
              name={"fullName"}
              label={"Full Name"}
              rules={[
                {
                  required: true,
                  message: "Please select your habitual residence!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"username"}
              label={"Username"}
              r
              rules={[
                {
                  required: true,
                  message: "Please select your habitual residence!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"password"}
              label={"Password"}
              rules={[
                {
                  required: true,
                  message: "Please select your habitual residence!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"confirmPassword"}
              label={"Confirm Password"}
              rules={[
                {
                  required: true,
                  message: "Please select your habitual residence!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue(["password"]) === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"email"}
              label={"Email"}
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please select your habitual residence!",
                },
              ]}
            >
              <Input placeholder='Email' />
            </Form.Item>
          </Form>
        </Modal>
      </Space>
      <Table
        loading={isLoading}
        dataSource={account}
        rowKey={(record) => record._id}
        pagination={false}
        bordered={true}
      >
        <Column title={"Họ và tên"} dataIndex={"fullName"} key={"fullName"} />
        <Column
          title={"Tên tài khoản"}
          dataIndex={"username"}
          key={"username"}
        />
        <Column
          title={"Email"}
          dataIndex={"email"}
          key={"email"}
          responsive={["md"]}
        />
        <Column
          title={"Xác thực email"}
          dataIndex={"verified"}
          key={"verified"}
          render={(verified) => {
            if (verified)
              return (
                <Tag color={"green"} key={verified}>
                  Đã xác thực
                </Tag>
              );
            return (
              <Tag color={"red"} key={"verified"}>
                Chưa xác thực
              </Tag>
            );
          }}
        />
        <Column
          title='Quyền'
          dataIndex='role'
          key='role'
          render={(role, record) => {
            if (record.username === "admin")
              return (
                <Select defaultValue={role}>
                  <Option value={1}>Quản trị viên</Option>
                </Select>
              );
            const handleChange = async (value) => {
              setIsLoading(true);
              await adminApi
                .changeRole(record._id, value)
                .then((res) => {
                  message.success(res);
                  setIsLoading(false);
                })
                .catch((e) => {
                  message.error(e.response.data);
                  setIsLoading(false);
                });
            };
            return (
              <Select onChange={handleChange} defaultValue={role}>
                <Option value={1}>Quản trị viên</Option>
                <Option value={0}>Khách hàng</Option>
              </Select>
            );
          }}
        />
        <Column
          title={"Thao tác"}
          key={"action"}
          render={(text, record) => {
            return (
              <Space>
                <Popconfirm
                  placement='bottomRight'
                  title={"Bạn chắc chắn?"}
                  onConfirm={() => deleteAccount(record._id)}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button icon={<DeleteOutlined />}>Xóa</Button>
                </Popconfirm>
                <Button
                  onClick={() => {
                    if (record.__v === 0) {
                      updateStateAccount(record._id, -1);
                    }
                    if (record.__v === -1) {
                      updateStateAccount(record._id, 0);
                    }
                  }}
                  icon={record.__v ? <UnlockOutlined /> : <LockOutlined />}
                >
                  {record.__v ? "Mở khóa" : "Khóa"}
                </Button>
              </Space>
            );
          }}
        />
      </Table>
      <div
        style={{
          margin: "1rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Pagination
          defaultCurrent={1}
          current={page}
          total={totalDocuments}
          onChange={(page) => handleChangePage(page)}
        />
      </div>
    </div>
  );
}

export default Account;
