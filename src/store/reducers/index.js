import { combineReducers } from "redux";
import login from "./login";
import profile from "./profile";
// 组合各个 reducer 函数，成为一个根 reducer
const rootReducer = combineReducers({
  login,
  profile,
});

// 导出根 reducer
export default rootReducer;
