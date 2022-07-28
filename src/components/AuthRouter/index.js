import { getToken } from "@/utils/auth";
import { Redirect, Route } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

/**
 * 鉴权路由组件
 * @param {*} component 本来 Route 组件上的 component 属性
 * @param {Array} rest 其他属性
 */
const AuthRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={() => {
        // 如果有 token，则展示传入的组件
        if (getToken()) {
          return <Component />;
        }

        // 否则调用 Redirect 组件跳转到登录页
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location.pathname,
              },
            }}
          />
        );
      }}
    />
  );
};

export default AuthRoute;
