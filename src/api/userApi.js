import { axiosClient } from "./axiosClient";

export const userApi = {
  login: (user) => {
    const url = "/user/login";
    return axiosClient.post(url, user);
  },
  register: (user) => {
    const url = "/user/register";
    return axiosClient.post(url, user);
  },
  activeEmail: (accessToken) => {
    const url = `/user/verify?accessToken=${accessToken}`;
    return axiosClient.get(url);
  },
  recover_password_send: (email) => {
    const url = "/user/recover-password";
    return axiosClient.post(url, { email });
  },
  recover_password_success: (accessToken, password) => {
    const url = `/user/new-password?accessToken=${accessToken}`;
    return axiosClient.post(url, { password });
  },
  update_history_cart: (idUser, cart) => {
    const url = `user/update-history-cart?id=${idUser}`;
    return axiosClient.post(url, { cart });
  },
  update_avatar: (data) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = "/user/update-avatar";
    return axiosClient.post(url, data, config);
  },
  update_infomation: (data) => {
    const url = "/user/update-infomation";
    return axiosClient.post(url, data);
  },
};
