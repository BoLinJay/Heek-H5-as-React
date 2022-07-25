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

/**
 * 修改个人详情：昵称、简介、生日、性别 （每次修改一个字段）
 * @param {String} name 要修改的字段名称
 * @param {*} value 要修改的字段值
 * @returns thunk
 */
export const updateProfile = (type, value) => {
  return async (dispatch) => {
    const userList = await www("/user/profile", "patch", { [type]: value });
    // 如果获取数据成功，则重新获取数据
    if (userList.message === "OK") {
      dispatch(findUser());
    }
  };
};

/**
 * 更新头像
 * @param {FormData} formData 上传头像信息的表单数据
 * @returns thunk
 */
export const updateAvatar = (formData) => {
  return async (dispatch) => {
    // 调用接口进行上传
    const res = await www("/user/photo", "patch", formData);

    // 如果后端更新成功，则再更新 Redux 中的数据
    if (res.message === "OK") {
      dispatch(findUser());
    }
  };
};
