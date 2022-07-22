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

/**
 * 获取个人资料
 * @param {*} user
 */
export const findUser = () => {
  return async (dispatch) => {
    const user = await www("/user/profile", "get");
    console.log(user);
    dispatch(saveUser(user.data));
  };
};

/**
 *
 * 存入个人资料进redux中
 *
 */

export const saveUser = (payload) => {
  return {
    type: "profile/useredit",
    payload,
  };
};
