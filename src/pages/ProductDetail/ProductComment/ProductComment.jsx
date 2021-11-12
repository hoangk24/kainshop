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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productApi } from "../../../api/productApi";
export default function ProductComment({ idProduct }) {
  const user = useSelector((state) => state.user.user);
  const isLogin = useSelector((state) => state.user.isLogin);
  const socketIo = useSelector((state) => state.user.socketIo);
  const [data, setData] = useState([]);
  const { TextArea } = Input;
  const onFinish = (value) => {
    if (!isLogin) {
      message.error("Hãy đăng nhập để tiếp tục bình luận!");
      return;
    }
    const comment = {
      idProduct,
      idUser: user._id,
      avatar: user.avatar,
      fullName: user.fullName,
      content: value.comment,
    };
    socketIo.emit("userCreateComment", comment);
  };
  useEffect(async () => {
    if (idProduct) {
      const data = await productApi.getCommentProduct(idProduct);
      setData(data);
    }
    socketIo.emit("joinRoom", idProduct);
    socketIo.on("newCommentAdded", (comment) => {
      setData(comment);
    });
    return () => {
      socketIo.emit("outRoom", idProduct);
    };
  }, [socketIo, idProduct]);

  return (
    <div className='product-detail-comment'>
      {data?.length > 0 ? (
        <List
          className='comment-list'
          header={`${data.length} bình luận`}
          dataSource={data}
          renderItem={(item) => (
            <Comment
              author={item.fullName}
              avatar={<Avatar src={item.avatar} />}
              content={item.content}
              datetime={item.createdAt}
            />
          )}
        />
      ) : (
        <div>Chưa có bình luận nào</div>
      )}
      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item label='Thêm bình luận' name='comment'>
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit'>Thêm</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
