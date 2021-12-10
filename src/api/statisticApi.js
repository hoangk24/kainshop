import { axiosClient } from "./axiosClient";

export const statisticApi = {
  cart: () => {
    const url = "/statistic/cart";
    return axiosClient.get(url);
  },
  cartBetween: (value) => {
    const url = "/statistic/cart2";
    return axiosClient.post(url, value);
  },
};
