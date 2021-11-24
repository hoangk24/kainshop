import { Modal } from "antd";
import React from "react";
import Avatar from "./Avatar/Avatar";
import Info from "./Info/Info";

export default function UserInfo({ user, visible, closeModal }) {
  return (
    <Modal visible={visible} onCancel={closeModal}>
      <Avatar avatar={user?.avatar} />
      <Info user={user} />
    </Modal>
  );
}
