import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  register,
  order,
  updateAvatar,
  updateInfomation,
  logOut,
} from "./userThunk";
import UserServices from "../../helper/userLocal";
import { message } from "antd";
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
        `Ch??o ${state.user.fullName}! Ch??c b???n m???t ng??y t???t l??nh`
      );
    },
    [login.rejected]: (state, action) => {
      state.isLoadingLogin = false;
    },
    [register.pending]: (state, action) => {
      state.isLoadingRegister = true;
    },
    [register.fulfilled]: (state, action) => {
      message.success("M???t email x??c nh???n ???? ???????c g???i v??o email c???a b???n!");
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
      message.success("?????t h??ng th??nh c??ng!");
    },
    [order.rejected]: (state, action) => {
      message.error("?????t h??ng th???t b???i!");
    },
    [updateAvatar.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateAvatar.fulfilled]: (state, action) => {
      // message.success("C???t nh???t ???nh ?????i di???n th??nh c??ng!");
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
      message.success("Update th??ng tin th??nh c??ng!");
    },
    [updateInfomation.rejected]: (state, action) => {
      message.error("Update th??ng tin kh??ng th??nh c??ng!");
    },
    [logOut.pending]: (state, action) => {},
    [logOut.fulfilled]: (state, action) => {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("cart");
      state.isLogin = false;
      state.user = {};
      message.success("Th??nh c??ng!");
    },
    [logOut.rejected]: (state, action) => {
      message.error("Th???t b???i!");
    },
  },
});
const { reducer, actions } = userSlice;
export const { addCart, removeCart, editCount, log_out } = actions;
export default reducer;

//  log_out: (state, action) => {
//       // localStorage.removeItem("user");
//       // localStorage.removeItem("accessToken");
//       // localStorage.removeItem("refreshToken");
//       // state.isLogin = false;
//       // state.user = {};
//     },
