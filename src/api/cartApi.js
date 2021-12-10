import { axiosClient } from "./axiosClient";

export const cartApi = {
  getCart: () => {
    const url = "/cart/get-my-cart";
    return axiosClient.get(url);
  },
  addCart: (cart) => {
    const url = "/cart/add-cart";
    return axiosClient.post(url, cart);
  },
  closeCart: (id) => {
    const url = `/cart/close-cart?cart=${id}`;
    return axiosClient.post(url);
  },
  checkQuantity: (id, quantity) => {
    const url = `/cart/check-quantity?idProduct=${id}`;
    return axiosClient.post(url, { quantity: quantity });
  },
};
