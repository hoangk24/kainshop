import { axiosClient } from "./axiosClient";

export const addressApi = {
  getCity: () => {
    const url = "/address/city";
    return axiosClient.get(url);
  },
  getDistrict: (city) => {
    const url = `/address/district?city=${city}`;
    return axiosClient.get(url);
  },
  getWard: (city, district) => {
    const url = `/address/ward?city=${city}&district=${district}`;
    return axiosClient.get(url);
  },
};
