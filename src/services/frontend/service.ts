import Axios from "axios";

const service = Axios.create();

service.interceptors.request.use(async (config) => {
  return config;
});

export default service;
