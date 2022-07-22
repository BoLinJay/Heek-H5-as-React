import { Toast } from "antd-mobile";
import axios from "axios";
import { getToken } from "./auth";

const www = axios.create({
  timeout: 1000,
  baseURL: "http://geek.itheima.net/v1_0",
});

// 请求拦截器
www.interceptors.request.use(
  (config) => {
    //   请求前做些什么
    const Cookie = getToken();
    config.headers["Authorization"] = `Bearer ${Cookie} `;
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
    // 统一处理无错误信息状态
    if (!error.response) {
      Toast.show({
        content: "网太卡了，稍后再试吧",
        maskClickable: false,
      });
    }
    return Promise.reject(error);
  }
);
// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return www({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === "get" ? "params" : "data"]: submitData,
  });
};
