import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  order,
  updateAvatar,
  updateInfomation,
} from "./userThunk";
import UserServices from "../../helper/userLocal";
import { message, notification } from "antd";
import { io } from "socket.io-client";

const userSlice = createSlice({
  name: "user",
  initialState: {
    sendMailSuccess: false,
    isLoadingRegister: false,
    isLoading: false,
    isLogin: Boolean(UserServices.getUserInfo()),
    isAdmin: Boolean(
      UserServices.getUserInfo() && UserServices.getUserInfo().role === 1
    ),
    isLoadingLogin: false,
    user: UserServices.getUserInfo() || null,
    accessToken: "",
    refreshToken: "",
    countCart: UserServices.getCountCart(),
    cartLocal: JSON.parse(localStorage.getItem("cart")) || [],
    socketIo: io(import.meta.env.VITE_API_URL),
  },
  reducers: {
    addCart: (state, action) => {
      UserServices.updateCart(action.payload);
      state.countCart = UserServices.getCountCart();
    },
    editCount: (state, action) => {
      UserServices.editCount(action.payload);
      state.cartLocal = UserServices.getUserCart();
    },
    removeCart: (state, action) => {
      const cart = state.cartLocal;
      console.log(cart);
      UserServices.removeCart(action.payload);
      state.countCart = UserServices.getCountCart();
      state.cartLocal = UserServices.getUserCart();
      console.log(state.cartLocal);
    },
    log_out: (state, action) => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.isLogin = false;
      state.user = {};
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoadingLogin = true;
    },
    [login.fulfilled]: (state, action) => {
      UserServices.updateUser(action.payload);
      state.user = action.payload.user;
      state.isLoadingLogin = false;
      state.isLogin = true;
      state.countCart = UserServices.getCountCart();
      state.cartLocal = UserServices.getUserCart();
      message.success(
        `Chào ${state.user.fullName}! Chúc bạn một ngày tốt lành`
      );
    },
    [login.rejected]: (state, action) => {
      state.isLoadingLogin = false;
    },
    [register.pending]: (state, action) => {
      state.isLoadingRegister = true;
    },
    [register.fulfilled]: (state, action) => {
      message.success("Một email xác nhận đã được gửi vào email của bạn!");
      state.isLoadingRegister = false;
      state.sendMailSuccess = true;
    },
    [register.rejected]: (state, action) => {
      state.isLoadingRegister = false;
    },
    [order.pending]: (state, action) => {},
    [order.fulfilled]: (state, action) => {
      localStorage.setItem("cart", JSON.stringify([]));
      state.cartLocal = [];
      state.countCart = 0;
      message.success("Đặt hàng thành công!");
    },
    [order.rejected]: (state, action) => {
      message.error("Đặt hàng thất bại!");
    },
    [updateAvatar.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateAvatar.fulfilled]: (state, action) => {
      // message.success("Cật nhật ảnh đại diện thành công!");
      state.isLoading = false;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [updateAvatar.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateInfomation.pending]: (state, action) => {},
    [updateInfomation.fulfilled]: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    [updateInfomation.rejected]: (state, action) => {},
  },
});
const { reducer, actions } = userSlice;
export const { addCart, removeCart, editCount, log_out } = actions;
export default reducer;
