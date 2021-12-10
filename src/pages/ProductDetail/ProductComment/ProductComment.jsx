import {
  Avatar,
  Comment,
  Input,
  Form,
  Button,
  List,
  Rate,
  message,
} from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productApi } from "../../../api/productApi";
import LoginModal from "../../../components/LoginModal/LoginModal";
export default function ProductComment({ idProduct }) {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.user.isLogin);
  const socketIo = useSelector((state) => state.user.socketIo);
  const [rate, setRate] = useState(0);
  const [data, setData] = useState([]);
  const desc = ["Tệ", "Tạm", "Bình thường", "Tốt", "Rất tốt"];

  const { TextArea } = Input;
  const onFinish = (value) => {
    if (!isLogin) {
      message.error("Hãy đăng nhập để tiếp tục bình luận!");
      return;
    }
    if (rate === 0) {
      message.error("Hãy đánh giá số sao của bạn cho sản phẩm này");
      return;
    }
    const comment = {
      idProduct,
      idUser: user._id,
      avatar: user.avatar,
      fullName: user.fullName,
      content: value.comment,
      rate: rate,
    };

    socketIo.emit("userCreateComment", comment);
    form.resetFields();
  };

  const deleteComment = (e, idComment) => {
    e.preventDefault();
    const data = {
      idProduct,
      idUser: user._id,
      idComment,
    };
    socketIo.emit("userDeleteComment", data);
  };
  useEffect(async () => {
    socketIo.emit("joinRoom", idProduct);
    if (idProduct) {
      const comment = await productApi.getCommentProduct(idProduct);
      setData(comment);
    }
    socketIo.on("newCommentAdded", (comment) => {
      console.log(comment);
      setData(comment);
    });
    socketIo.on("aCommentDeleted", (comment) => {
      console.log(comment);
      setData(comment);
    });
  }, [socketIo, idProduct]);

  useEffect(() => {
    return () => {
      socketIo.emit("leaveRoom", idProduct);
    };
  }, []);

  return (
    <div className='product-detail-comment'>
      {data?.length > 0 ? (
        <List
          className='comment-list'
          header={`${data.length} bình luận`}
          dataSource={data}
          renderItem={(item) => {
            return (
              <List.Item
                actions={
                  isLogin && user._id === item.idUser
                    ? [
                        <a
                          onClick={(e) => deleteComment(e, item._id)}
                          key='list-loadmore-edit'
                        >
                          Xóa
                        </a>,
                        <a key='list-loadmore-more'>Sửa</a>,
                      ]
                    : []
                }
              >
                <Comment
                  author={item.fullName}
                  avatar={<Avatar src={item.avatar} />}
                  content={
                    <div>
                      <div>
                        <Rate disabled value={item.rate} />
                        {item.rate ? (
                          <span className='ant-rate-text'>
                            {desc[item.rate - 1]}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      {item.content}
                    </div>
                  }
                  datetime={moment().startOf("hour").from(item.createdAt)}
                />
              </List.Item>
            );
          }}
        />
      ) : (
        <div>Chưa có bình luận nào</div>
      )}
      <Form
        layout='vertical'
        onFinish={onFinish}
        form={form}
        initialValues={{ comment: "" }}
      >
        <Form.Item
          label='Thêm bình luận'
          name='comment'
          rules={[{ required: true, message: "Hãy thêm bình luận của bạn" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item label='Đánh giá'>
          <Rate defaultValue={rate} onChange={(number) => setRate(number)} />
          {rate ? <span className='ant-rate-text'>{desc[rate - 1]}</span> : ""}
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Thêm</Button>
        </Form.Item>
      </Form>
      {/* <LoginModal /> */}
    </div>
  );
}
