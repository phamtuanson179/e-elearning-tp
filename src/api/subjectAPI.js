import axiosClient from "./baseAPI";

const subjectAPI = {
  getAll: () => {
    const url = "/subject/get-all";
    return axiosClient.get(url);
  },
  getSubjectForMe: () => {
    const url = "/subject/get-subject-for-me";
    return axiosClient.get(url);
  },
  create: (data) => {
    const url = "/subject/create";
    return axiosClient.post(url, data);
  },
  update: (params, data) => {
    const url = "/subject/update";
    return axiosClient.put(url, data, { params });
  },
  delete: (params) => {
    const url = "/subject/delete";
    return axiosClient.delete(url, { params });
  },
};

export default subjectAPI;
