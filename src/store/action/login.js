import www from "@utils/request.js";
import { setToken, removeToken } from "@utils/auth";
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
    // 保存到本地
    console.log(tokenInfo);
    setToken(tokenInfo.data);
    // 保存token到redux中
    dispacth(saveToken(tokenInfo.data));
  };
};

/**
 * 将 Token 信息保存到 Redux 中
 * @param {*} tokens
 * @returns
 */
export const saveToken = (payload) => {
  return {
    type: "login/token",
    payload,
  };
};

/**
 * 退出登录，删除redux中的token信息和本地
 */
export const clearToken = () => {
  return {
    type: "login/clear",
  };
};

export const logout = () => {
  return (dispatch) => {
    // 删除redux
    dispatch(clearToken());
    //清空本地
    removeToken();
  };
};
