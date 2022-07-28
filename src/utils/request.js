import { Toast } from "antd-mobile";
import axios from "axios";
import { getToken, removeToken, setToken } from "./auth";
import store from "@/store";
import { clearToken, saveToken } from "../store/action/login";
import history from "./history";
const www = axios.create({
  timeout: 5000,
  baseURL: "http://geek.itheima.net/v1_0",
});

// 请求拦截器
www.interceptors.request.use(
  (config) => {
    //   请求前做些什么
    if (getToken()) {
      const Cookie = getToken().token;
      config.headers["Authorization"] = `Bearer ${Cookie}`;
    }
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
  async (err) => {
    // 统一处理无错误信息状态
    const { response, config } = err;
    if (!response) {
      Toast.show({
        content: "网太卡了，稍后再试吧",
        maskClickable: false,
      });
      return Promise.reject(err);
    }
    const { token, refresh_token } = getToken();
    if (!token || !refresh_token) {
      history.replace("login", {
        from: history.location.pathname || "/",
      });
      return Promise.reject(err);
    }
    if (response.status !== 401) {
      Toast.show({
        content: response.data.message,
        maskClickable: false,
      });
      return Promise.reject(err);
    } else {
      try {
        // 通过 Refresh Token 换取新 Token
        // 特别说明：这个地方发请求的时候，不能使用新建的 http 实例去请求，要用默认实例 axios 去请求！
        // 否则会因 http 实例的请求拦截器的作用，携带上老的 token 而不是 refresh_token
        const res = await axios.put(`${config.baseURL}/authorizations`, null, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${refresh_token}`,
          },
        });

        // 将新换到的 Token 信息保存到 Redux 和 LocalStorage 中
        const tokenInfo = {
          token: res.data.data.token,
          refresh_token,
        };
        setToken(tokenInfo);
        store.dispatch(saveToken(tokenInfo));

        // 重新发送之前因 Token 无效而失败的请求
        return www(config);
      } catch (error) {
        // ... 这里后续编写 Token 换取失败的逻辑 ...
        // 清除 Redux 和 LocalStorage 中 Token 信息
        removeToken();
        store.dispatch(clearToken());

        // 跳转到登录页，并携带上当前正在访问的页面，等登录成功后再跳回该页面
        history.push("/login", {
          from: history.location.pathname || "/home",
        });

        return Promise.reject(error);
      }
    }
  }
);
// 请求工具函数
// eslint-disable-next-line import/no-anonymous-default-export
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
