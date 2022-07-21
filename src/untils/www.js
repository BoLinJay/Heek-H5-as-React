import axios from "axios";

const www = axios.create({
  timeout: 5000,
  baseURL: "http://geek.itheima.net/v1_0",
});

// 请求拦截器
www.interceptors.request.use(
  (config) => {
    //   请求前做些什么
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
www.interceptors.response.use(
  (response) => {
    //   拿到数据后做些设么
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default www;
