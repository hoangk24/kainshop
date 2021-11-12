import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Space, Table, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import { adminApi } from "../../../api/adminApi";
import { productApi } from "../../../api/productApi";
import { CloseOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

function Category({ show, close }) {
  const { Column } = Table;
  const [addCateLoading, setAddCateLoading] = useState(false);
  const [categoryData, setCategoryData] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [isActive, setIsActive] = useState([]);
  const [itemName, setItemName] = useState("");
  const [formDM] = useForm();
  const submitDM = async (value) => {
    setAddCateLoading(true);
    setTimeout(async () => {
      await adminApi
        .addCategory(value)
        .then((res) => {
          fetchCate();
          message.success("Thêm danh mục thành công");
          setAddCateLoading(false);
        })
        .catch((e) => {
          setAddCateLoading(false);
        });
    }, 1500);
  };
  const addItemForCate = async (id) => {
    setCategoryLoading(true);
    await adminApi
      .addItemCategory(itemName, id)
      .then((result) => {
        fetchCate();
        message.success("Thêm thành công");
        setCategoryLoading(false);
        setIsActive("");
      })
      .catch((e) => {
        setCategoryLoading(false);
        message.error(e.response.data);
      });
  };

  const removeItemForCate = async (id, item) => {
    setCategoryLoading(true);
    await adminApi
      .removeItemCategory(item, id)
      .then((res) => {
        fetchCate();
        message.success("Xóa thành công!");
        setCategoryLoading(false);
      })
      .catch((e) => {
        message.error(e.response.data);
        setCategoryLoading(false);
      });
  };

  const deleteCategory = async (id) => {
    setCategoryLoading(true);
    await adminApi
      .deleteCategory(id)
      .then((res) => {
        fetchCate();
        setCategoryLoading(true);
        message.success("Xóa danh mục thành công!");
      })
      .catch((e) => {
        message.error(e.response.data);
        setCategoryLoading(false);
      });
  };

  const fetchCate = async () => {
    setCategoryLoading(true);
    await productApi
      .getCategory()
      .then((res) => {
        setCategoryData(res);
        setCategoryLoading(false);
      })
      .catch((e) => {
        message.error(e.response.data);
        setCategoryLoading(false);
      });
  };
  useEffect(async () => {
    await fetchCate();
  }, []);

  return (
    <>
      <Modal width={1000} visible={show} onCancel={close}>
        <h1 style={{ textAlign: "center" }}>Thêm danh muc mới</h1>
        <Form
          form={formDM}
          initialValues={{ name: "" }}
          labelCol={{ span: 3 }}
          onFinish={submitDM}
        >
          <Form.Item
            label={"Danh mục"}
            name={"name"}
            rules={[{ required: true, message: "Phải điền tên danh mục" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 3 }}>
            <Button loading={addCateLoading} type='primary' htmlType='submit'>
              Thêm danh mục
            </Button>
          </Form.Item>
        </Form>
        <Table
          bordered
          tableLayout={"auto"}
          sortDirections
          size={"small"}
          dataSource={categoryData}
          loading={categoryLoading}
          pagination={false}
        >
          <Column title={"Tên danh mục"} dataIndex={"name"} width={200} />
          <Column
            title={"Nhà sản xuất"}
            dataIndex={"item"}
            render={(item, record) => {
              const renderItem = item?.map((ele, index) => (
                <>
                  <Tag color={"green"}>
                    {ele}
                    <CloseOutlined
                      onClick={() => removeItemForCate(record._id, ele)}
                    />
                  </Tag>
                </>
              ));
              return (
                <div>
                  {item.length === 0 && record._id !== isActive ? (
                    "Chưa có nhà sản xuất nào"
                  ) : (
                    <div>{renderItem}</div>
                  )}
                  {record._id === isActive ? (
                    <Input
                      style={{ margin: ".1rem 0" }}
                      onChange={(e) => setItemName(e.target.value)}
                    />
                  ) : null}
                  <Space>
                    {isActive !== record._id ? (
                      <Button
                        style={{ marginTop: ".3rem" }}
                        onClick={() => setIsActive(record._id)}
                        type={"dashed"}
                        icon={<PlusOutlined />}
                      >
                        Thêm NSX
                      </Button>
                    ) : null}
                    {isActive === record._id ? (
                      <Space>
                        <Button
                          onClick={() => setIsActive("")}
                          icon={<CloseOutlined />}
                        />
                        <Button
                          onClick={() => addItemForCate(record._id)}
                          icon={<SaveOutlined />}
                        />
                      </Space>
                    ) : null}
                  </Space>
                </div>
              );
            }}
          />
          <Column
            title='Thao tác'
            render={(record) => {
              return (
                <Space>
                  <Button onClick={() => deleteCategory(record._id)}>
                    Xóa
                  </Button>
                  <Button>Sửa</Button>
                </Space>
              );
            }}
          />
        </Table>
      </Modal>
    </>
  );
}

export default Category;
