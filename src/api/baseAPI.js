import axiosInstance from "axios";

const axiosClient = axiosInstance.create({
  baseURL: "http://localhost:8001",
});

axiosClient.interceptors.request.use(function (config) {
  //add handle token
  let headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  if (localStorage.getItem("token")) {
    headers = {
      ...headers,
      Authorization: localStorage.getItem("token"),
    };
  }

  config.headers = headers;
  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    return err;
  }
);

export default axiosClient;
