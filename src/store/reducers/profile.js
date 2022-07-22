import { SAVE_USERINFO } from "@store/action_types/profile";

const initValue = {
  userInfo: {},
  profile: {},
};

export default function (state = initValue, action) {
  const { type, payload } = action;
  if (type === SAVE_USERINFO) {
    return {
      ...state,
      userInfo: { ...payload },
    };
  }
  return state;
}
