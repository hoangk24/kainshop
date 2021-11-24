import { axiosClient } from "./axiosClient";

export const productApi = {
  getProductDetail: (id) => {
    const url = `/product/get-product-detail?id=${id}`;
    return axiosClient.get(url);
  },
  getProduct: (page) => {
    const url = `/product/get-all-product?page=${page || 1}`;
    return axiosClient.get(url);
  },
  getNewProduct: () => {
    const url = `/product/get-all-product?page=1`;
    return axiosClient.get(url);
  },
  getCategory: () => {
    const url = "/category/get-all-category";
    return axiosClient.get(url);
  },
  getProductByNSX: (nsx) => {
    const url = `/product/get-product-by-nsx?nsx=${nsx}`;
    return axiosClient.get(url);
  },
  getProductByCategory: (category) => {
    const url = `/product/get-product-by-category?category=${category}`;
    return axiosClient.get(url);
  },
  getCommentProduct: (id) => {
    const url = `/product/get-comment?id=${id}`;
    return axiosClient.get(url);
  },
  searchProduct: (keyword) => {
    const url = `/product/search?keyword=${keyword}`;
    return axiosClient.get(url);
  },
};
