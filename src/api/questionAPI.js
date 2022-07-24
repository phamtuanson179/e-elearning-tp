import axiosClient from "./baseAPI";

const questionAPI = {
  getRandomQuestions: (params) => {
    const url = "/question/get-random-questions";
    return axiosClient.get(url, { params });
  },
  getAll: () => {
    const url = "/question/get-all";
    return axiosClient.get(url);
  },
  update: (params, data) => {
    const url = "/question/update";
    return axiosClient.put(url, data, { params });
  },
  create: (data) => {
    const url = "/question/create";
    return axiosClient.post(url, data);
  },
  delete: (params) => {
    const url = "/question/delete";
    return axiosClient.post(url, { params });
  },
};

export default questionAPI;
