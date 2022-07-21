import { combineReducers } from "redux";
import { login } from "./login";

// 组合各个 reducer 函数，成为一个根 reducer
const rootReducer = combineReducers({
  login,
});

// 导出根 reducer
export default rootReducer;
