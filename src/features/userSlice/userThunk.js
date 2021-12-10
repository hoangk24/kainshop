import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { cartApi } from "../../api/cartApi";
import { userApi } from "../../api/userApi";

export const login = createAsyncThunk("user/login", async (data) => {
  const res = await userApi.login(data);
  return res;
});

export const register = createAsyncThunk("user/register", async (data) => {
  const res = await userApi.register(data);
  return res;
});

// export const log_out = createAsyncThunk("user/logout", async (data) => {
//   const { cart, idUser } = data;
//   const res = await userApi.update_history_cart(idUser, cart);
//   return res;
// });

export const order = createAsyncThunk("user/order", async (data) => {
  const res = await cartApi.addCart(data);
  return res;
});

export const updateAvatar = createAsyncThunk("user/avatar", async (data) => {
  const res = await userApi.update_avatar(data);
  return res;
});

export const updateInfomation = createAsyncThunk(
  "user/update-infomation",
  async (data) => {
    const res = await userApi.update_infomation(data);
    return res;
  }
);

export const logOut = createAsyncThunk("user/log_out", async (data) => {
  const res = userApi.save_cart(data);
  return res;
});
