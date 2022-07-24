import axiosClient from "./baseAPI";

const userAPI = {
  getAll: () => {
    const url = "/user/get-all";
    return axiosClient.get(url);
  },
  updateMe: () => {
    const url = "/user/update-me";
    return axiosClient.get(url);
  },
};

export default userAPI;
