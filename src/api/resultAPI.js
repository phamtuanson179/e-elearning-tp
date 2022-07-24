import axiosClient from "./baseAPI";

const resultAPI = {
  saveResult: (data) => {
    const url = "/result/save";
    return axiosClient.post(url, data);
  },
  getExamHistory: (params) => {
    const url = "/result/get-exam-history";
    return axiosClient.get(url, { params });
  },
};

export default resultAPI;
