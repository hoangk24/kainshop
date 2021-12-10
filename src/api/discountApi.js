import { axiosClient } from "./axiosClient";

export const discountApi = {
  getDiscount: () => {
    const url = "/discount/get-discount";
    return axiosClient.get(url);
  },
  addDiscount: (data) => {
    const url = "/discount/add-discount";
    return axiosClient.post(url, data);
  },
  removeDiscount: (id) => {
    const url = `/discount/delete-discount?id=${id}`;
    return axiosClient.delete(url);
  },
  updateDiscount: (data) => {
    const url = "/discount/update-discount";
    return axiosClient.post(url, data);
  },
  applyDiscount: (id) => {
    const url = `/discount/apply-discount?id=${id}`;
    return axiosClient.post(url);
  },
};
