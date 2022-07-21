import www from "@utils/request.js";
import { setToken, getToken } from "@utils/auth";
/**
 * 发送短信验证码
 * @param {string} mobile 手机号码
 * @returns thunk
 */
export const findCode = (mobile) => {
  return async (dispacth) => {
    const res = await www(`/sms/codes/${mobile}`, "get");
    console.log(res);
  };
};

/**
 * 登录
 * @param {{ mobile, code }} values 登录信息
 * @returns thunk
 */
export const findToken = (params) => {
  return async (dispacth) => {
    const tokenInfo = await www("authorizations", "post", params);
    // 保存到本地 Cookie
    const token = tokenInfo.data.token;
    setToken(token);
    // 保存token到redux中
    dispacth(saveToken(tokenInfo));
    console.log(token);
  };
};

/**
 * 将 Token 信息保存到 Redux 中
 * @param {*} tokens
 * @returns
 */
export const saveToken = (tokenInfo) => {
  return {
    type: "login/token",
    payload: tokenInfo,
  };
};
