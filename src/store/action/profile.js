import www from "@utils/request";
/**
 * 获取个人信息
 * @returns Promise
 */

export const getUserInfo = () => {
  return async (dispatch) => {
    const userInfo = await www("/user", "get");
    dispatch(saveUserInfo(userInfo.data));
    console.log(userInfo);
  };
};

/**
 * 设置个人基本信息
 * @param {*} userInfo
 * @returns
 */

export const saveUserInfo = (payload) => {
  return {
    type: "profile/userInfo",
    payload,
  };
};
