import { Button, message, Spin, Upload } from "antd";
import { tuple } from "antd/lib/_util/type";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../../../../features/userSlice/userThunk";

export default function Avatar({ avatar }) {
  const loading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (f) => {
    const { file } = f;
    let formData = new FormData();
    formData.append("avatar", file.originFileObj);
    dispatch(updateAvatar(formData));
  };

  return (
    <div className='avatar'>
      <div className='avatar-img'>
        <img src={avatar} alt='' />
        {loading && (
          <div className='loading'>
            <Spin />
          </div>
        )}
      </div>
      <div className='avatar-button'>
        <Upload
          beforeUpload={beforeUpload}
          showUploadList={false}
          onChange={handleChange}
        >
          <a>Thay đổi avatar</a>
        </Upload>
      </div>
    </div>
  );
}
