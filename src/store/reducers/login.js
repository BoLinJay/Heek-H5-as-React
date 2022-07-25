const initialState = {
  token: "",
  refresh_token: "",
};
// 操作 Token 状态信息的 reducer 函数
export const login = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "login/token":
      return {
        ...state,
        ...payload,
      };
    case "login/clear":
      return {};
    default:
      return state;
  }
};
