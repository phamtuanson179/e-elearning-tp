import axiosClient from "./baseAPI";

const userAPI = {
  getAll: () => {
    const url = "/user/get-all";
    return axiosClient.get(url);
  },
  getUserForUser: () => {
    const url = "/user/get-user-for-user";
    return axiosClient.get(url);
  },
  create: (data) => {
    const url = "/user/create";
    return axiosClient.post(url, data);
  },
  update: (params, data) => {
    const url = "/user/update";
    return axiosClient.put(url, data, { params });
  },
  delete: (params) => {
    const url = "/user/delete";
    return axiosClient.delete(url, { params });
  },
  updateMe: (data) => {
    const url = "/user/update-me";
    return axiosClient.put(url, data);
  },
};

export default userAPI;
