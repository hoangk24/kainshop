import { createSlice } from "@reduxjs/toolkit";
import { login, register, log_out, order } from "./userThunk";
import UserServices from "../../helper/userLocal";
import { message, notification } from "antd";
import { io } from "socket.io-client";

const userSlice = createSlice({
  name: "user",
  initialState: {
    sendMailSuccess: false,
    isLoadingRegister: false,
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
    socketIo: io("https://kain-api.herokuapp.com"),
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
    [log_out.fulfilled]: (state, action) => {
      UserServices.removeUser();
      state.isLogin = false;
      state.cartLocal = [];
      state.countCart = 0;
      message.success("Đăng xuất thành công");
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
  },
});
const { reducer, actions } = userSlice;
export const { addCart, removeCart, editCount } = actions;
export default reducer;
