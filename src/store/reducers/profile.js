import { SAVE_USERINFO, SAVE_USEREDIT } from "@store/action_types/profile";

const initValue = {
  userInfo: {},
  profile: {},
};
// 个人信息reduce
export const profile = (state = initValue, action) => {
  const { type, payload } = action;
  if (type === SAVE_USERINFO) {
    return {
      ...state,
      userInfo: { ...payload },
    };
  }
  if (type === SAVE_USEREDIT) {
    return {
      ...state,
      profile: { ...payload },
    };
  }
  return state;
};
