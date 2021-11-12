import { axiosClient } from "./axiosClient";

export const adminApi = {
  getAllUser: (page) => {
    const url = `/admin/get-account?page=${page || 1}`;
    return axiosClient.get(url);
  },
  deleteUser: (id) => {
    const url = `/admin/delete-account?id=${id}`;
    return axiosClient.delete(url);
  },
  updateStateAccount: (id, lock) => {
    const url = "/admin/change-state-account";
    return axiosClient.post(url, { idUser: id, lock: lock });
  },
  addAccount: (user) => {
    const url = "/admin/create-account";
    return axiosClient.post(url, user);
  },
  changeRole: (idUser, role) => {
    const url = "admin/change-role";
    return axiosClient.post(url, { idUser, role });
  },
  addProduct: (data) => {
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const url = "/product/add-product";
    return axiosClient.post(url, data, config);
  },
  deleteProduct: (id) => {
    const url = `/product/delete-product?id=${id}`;
    return axiosClient.delete(url);
  },
  addCategory: (name) => {
    const url = "/category/add-category";
    return axiosClient.post(url, name);
  },
  addItemCategory: (item, id) => {
    const url = `/category/add-new-item?category=${id}`;
    return axiosClient.post(url, { item: item });
  },
  removeItemCategory: (item, id) => {
    const url = `/category/remove-item?category=${id}`;
    return axiosClient.post(url, { item });
  },
  deleteCategory: (id) => {
    const url = `/category/delete-category?id=${id}`;
    return axiosClient.delete(url);
  },
};
