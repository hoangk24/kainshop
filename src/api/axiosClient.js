import axios from "axios";
import qs from "query-string";
import { message } from "antd";
import UserServices from "../helper/userLocal";

export const axiosClient = axios.create({
  baseURL: "https://sunsine-api.herokuapp.com/api",
  headers: {
    Accept: "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params, { encode: false }),
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    message.error(err.response.data);
    return Promise.reject(err);
  }
);
axiosClient.interceptors.request.use(async (config) => {
  const token = UserServices.getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
