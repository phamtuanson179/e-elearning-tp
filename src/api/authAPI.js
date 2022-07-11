import axiosClient from "./baseAPI";
//  const BASE_URL="http://0.0.0.0:8000"

//  export default {
//      BASE_URL,
//      LOGIN: "http://0.0.0.0:8000/login"
//  }

const authAPI = {
  login: (data) => {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  aboutMe: () => {
    const url = "/about-me";
    return axiosClient.get(url);
  },
};

export default authAPI;
