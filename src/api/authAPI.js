import axiosClient from "./baseAPI";

const authAPI = {
  login: (data) => {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  aboutMe: () => {
    const url = "/about-me";
    return axiosClient.get(url);
  },
  changePassword: (data) => {
    const url = "/change-password";
    return axiosClient.post(url, data);
  },
};

export default authAPI;
