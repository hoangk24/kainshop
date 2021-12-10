import React, { useCallback, useEffect, useState } from "react";
import Title from "antd/es/typography/Title";
import {
  Avatar,
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  Upload,
} from "antd";
import {
  CloseCircleOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { adminApi } from "../../../api/adminApi";
import Loading from "../../Loading/Loading";
import { productApi } from "../../../api/productApi";
import Category from "./Category";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function Product(props) {
  const { Option } = Select;
  const [data, setData] = useState({});
  const { page, totalDocuments } = data;
  const [currenPage, setCurrenPage] = useState(1);
  const [productList, setProductList] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [PreviewImage, setPreviewImage] = useState([]);
  const [PreviewVisible, setPreviewVisible] = useState(false);
  const [fileListImage, setFileListImage] = useState([]);
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [nsx, setNsx] = useState([]);
  const column = [
    {
      title: "Hình ảnh",
      dataIndex: "poster",
      key: "poster",
      render: (poster) => {
        return (
          <div>
            <Avatar.Group maxCount={2} size='large'>
              {poster?.map((item, index) => (
                <Avatar key={index} src={item.url} />
              ))}
            </Avatar.Group>
          </div>
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (description) => {
        return (
          <Typography.Paragraph
            ellipsis={{
              rows: 2,
            }}
          >
            {description}
          </Typography.Paragraph>
        );
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            {size.map((item, index) => (
              <Tag color={"green"}>{item}</Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
      render: (color) => {
        return (
          <div style={{ whiteSpace: "nowrap" }}>
            {color.map((item, index) => (
              <Tag color={"blue"}>{item}</Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return (
          <Select defaultValue={1}>
            <Option value={1}>{category}</Option>
          </Select>
        );
      },
    },
    {
      title: "Nhà sản xuất",
      dataIndex: "NSX",
      key: "NSX",
      render: (NSX) => {
        return (
          <Select defaultValue={1}>
            <Option value={1}>{NSX}</Option>
          </Select>
        );
      },
    },
    {
      title: "Thao tác",
      render: (text, record) => {
        return (
          <Space direction='vertical'>
            <Button icon={<EditOutlined />}>Sửa</Button>
            <Popconfirm
              title={"Bạn chắc chắn?"}
              onConfirm={() => deleteProduct(record._id)}
            >
              <Button icon={<CloseCircleOutlined />}>Xóa</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const closeAddModel = useCallback(() => {
    form.resetFields();
    setAddModel(false);
    setFileListImage([]);
    setPreviewVisible(false);
    setPreviewImage([]);
  }, [form]);
  const handlePreview = async (file) => {
    try {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewVisible(true);
    } catch (error) {
      console.log(error);
    }
  };
  const changeDM = (value) => {
    setNsx([]);
    const listNSX = category.filter((item) => item.name === value);
    setNsx(listNSX[0].item);
  };
  const handleChange = (f) => {
    const { file, fileList, event } = f;
    setFileListImage(fileList);
  };

  const initialValues = {
    name: "",
    price: "",
    description: "",
    color: [],
    size: [],
  };
  const handleSubmit = useCallback(async (values) => {
    setIsLoading(true);
    let formData = new FormData();
    if (!values) {
      message.error("Phải điền đầy đủ thông tin!");
      return;
    }
    if (fileListImage.length < 4) {
      message.error("Phải có đủ 4 ảnh!");
      return;
    }
    formData.append("product", JSON.stringify(values));

    fileListImage.forEach((item) => {
      formData.append("poster", item.originFileObj);
    });
    await adminApi
      .addProduct(formData)
      .then((res) => {
        message.success("Thêm sản phẩm thành công!");
        closeAddModel();
        fetchProduct();
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  });

  const deleteProduct = async (id) => {
    setLoadingProduct(true);
    await adminApi
      .deleteProduct(id)
      .then((res) => {
        setLoadingProduct(false);
        fetchProduct();
        message.success(res);
      })
      .catch((e) => {
        setLoadingProduct(false);
        message.error(e.response.data);
      });
  };

  const fetchProduct = async () => {
    try {
      setLoadingProduct(true);
      const res = await productApi.getProduct();
      setData(res);
      console.log(res.data);
      setProductList(res.data);
      setLoadingProduct(false);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchCategory = async () => {
    await productApi.getCategory().then((res) => {
      setCategory(res);
    });
  };

  const onCloseCategoryModal = () => {
    setCategoryModal(false);
  };

  const handleChangePage = async (page) => {
    setIsLoading(true);
    const res = await productApi.getProduct(page);
    setData(res);
    setProductList(res.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchProduct();
    fetchCategory();
  }, []);

  return (
    <div className='product-admin'>
      <Title className={"account__title"}>Quản lý sản phẩm</Title>
      <Space>
        <Button onClick={() => setAddModel(true)}>Thêm sản phẩm</Button>
        <Button onClick={() => setCategoryModal(true)}>
          Thêm Danh mục và nhà sản xuất
        </Button>
      </Space>
      <Modal
        style={{ position: "relative" }}
        visible={addModel}
        onCancel={closeAddModel}
        onOk={form.submit}
      >
        {isLoading ? <Loading /> : null}
        <h1 style={{ textAlign: "center" }}>Thêm sản phẩm mới</h1>
        <Form
          labelCol={{ span: 7 }}
          onFinish={handleSubmit}
          form={form}
          initialValues={initialValues}
        >
          <Form.Item
            label={"Tển sản phẩm"}
            name={"name"}
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Giá"}
            name={"price"}
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <InputNumber style={{ width: "70%" }} />
          </Form.Item>
          <Form.Item
            label={"Mô tả"}
            name={"description"}
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.List
            name='size'
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length === 0) {
                    return Promise.reject(new Error("Phải có í nhất 1 size"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={`Size ${index + 1}`}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      labelCol={{ span: 10 }}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Hãy nhập size",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder='Hãy nhập size'
                        style={{ width: "60%" }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className='dynamic-delete-button'
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item label={"Thêm size"}>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    style={{ width: "60%" }}
                    icon={<PlusOutlined />}
                  >
                    Click here!
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.List
            name='color'
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length === 0) {
                    return Promise.reject(new Error("Phải có ít nhất 1 màu"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={`Màu ${index + 1}`}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      labelCol={{ span: 10 }}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Hãy nhập màu",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder='Hãy nhập màu'
                        style={{ width: "60%" }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className='dynamic-delete-button'
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item label={"Thêm màu"}>
                  <Button
                    type='dashed'
                    onClick={() => add()}
                    style={{ width: "60%" }}
                    icon={<PlusOutlined />}
                  >
                    Click here!
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item label={"Hình ảnh"}>
            <Upload
              fileList={fileListImage}
              listType='picture-card'
              beforeUpload={true}
              accept='.jpg, .jpeg, .png'
              onChange={handleChange}
              onPreview={handlePreview}
              maxCount={4}
              multiple
            >
              <Button
                disabled={Boolean(fileListImage.length === 4)}
                icon={<UploadOutlined />}
              />
              <Modal
                visible={PreviewVisible}
                title={"Xem ảnh"}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
              >
                <img
                  alt='example'
                  style={{ width: "100%" }}
                  src={PreviewImage}
                />
              </Modal>
            </Upload>
          </Form.Item>
          <Form.Item
            label={"Danh mục"}
            name={"category"}
            rules={[
              { required: true, message: "Phải chọn 1 trong các danh mục" },
            ]}
          >
            <Select defaultValue={"Chưa chọn"} onChange={changeDM}>
              {category.map((item, index) => (
                <Option key={index} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={"Nhà sản xuất"}
            name={"NSX"}
            rules={[
              {
                required: true,
                message: "Phải chọn 1 nhà sản xuất sau khi chọn danh mục",
              },
            ]}
          >
            <Select defaultValue={"Chưa chọn"}>
              {nsx?.map((item, index) => (
                <Option value={item} key={index}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        className='product-admin-table'
        rowKey={(record) => record._id}
        columns={column}
        loading={loadingProduct}
        dataSource={productList}
        pagination={false}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <Pagination
          defaultCurrent={1}
          total={totalDocuments}
          current={page}
          onChange={(page) => handleChangePage(page)}
        />
      </div>
      <Modal
        visible={PreviewVisible}
        title={"Xem ảnh"}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt='example' style={{ width: "100%" }} src={PreviewImage} />
      </Modal>
      <Category show={categoryModal} close={onCloseCategoryModal} />
    </div>
  );
}

export default Product;
