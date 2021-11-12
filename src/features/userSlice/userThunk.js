import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

export const login = createAsyncThunk("user/login", async (data) => {
  const res = await userApi.login(data);
  return res;
});

export const register = createAsyncThunk("user/register", async (data) => {
  const res = await userApi.register(data);
  return res;
});

export const log_out = createAsyncThunk("user/logout", async (data) => {
  const { cart, idUser } = data;
  const res = await userApi.update_history_cart(idUser, cart);
  console.log(res);
  return res;
});
