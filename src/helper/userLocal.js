import { message } from "antd";

const UserServices = {
  getAccessToken: () => {
    return JSON.parse(localStorage.getItem("accessToken"));
  },
  getRefreshToken: () => {
    return localStorage.getItem("refreshToken");
  },
  getUserInfo: () => {
    return JSON.parse(localStorage.getItem("user"));
  },
  updateUser: (data) => {
    const { user, accessToken, refreshToken } = data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", JSON.stringify(accessToken));
    localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    // localStorage.setItem("cart", JSON.stringify(history));
  },
  removeUser: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("cart");
  },
  getUserCart: () => {
    return JSON.parse(localStorage.getItem("cart"));
  },
  updateCart: (update) => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([update]));
      message.success("Đặt hàng thành công");
      return;
    }
    const cartList = JSON.parse(localStorage.getItem("cart"));
    const index = cartList.findIndex((item) => item._id === update._id);
    if (index >= 0) {
      cartList[index].count += update.count;
      cartList[index].total += update.total;
      localStorage.setItem("cart", JSON.stringify(cartList));
      message.success("Đặt hàng thành công");
    } else {
      cartList.push(update);
      localStorage.setItem("cart", JSON.stringify(cartList));
      message.success("Đặt hàng thành công");
    }
  },
  editCount: (data) => {
    const { _id, newCount } = data;
    if (newCount < 0) {
      message.error("Số lượng phải là số dương!");
      return;
    }
    const cartList = JSON.parse(localStorage.getItem("cart"));
    const index = cartList.findIndex((item) => item._id === _id);
    if (newCount === 0) {
      const check = confirm(
        "Số lượng bằng 0 là bạn sẽ xóa sản phẩm khỏi giỏ hàng bạn chắc chắn chứ?"
      );
      if (!check) return;
      const newCart = cartList.filter((item) => item._id !== _id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return;
    }
    cartList[index].count = newCount;
    cartList[index].total = cartList[index].price * newCount;
    localStorage.setItem("cart", JSON.stringify(cartList));
  },
  removeCart: (_id) => {
    const cartList = JSON.parse(localStorage.getItem("cart"));
    const newCart = cartList.filter((item) => item._id !== _id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    message.success("Xóa thành công!");
  },

  getCountCart: () => {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
    return 0;
  },
};

export default UserServices;
