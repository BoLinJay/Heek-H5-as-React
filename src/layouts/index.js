import React, { Suspense } from "react";
import styles from "./index.module.scss";
import Icon from "@components/Icon";
import classNames from "classnames";
import { Route, Switch, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthRoute from "../components/AuthRouter";
const Video = React.lazy(() => import("@pages/Video"));
const Question = React.lazy(() => import("@pages/Question"));
const Profile = React.lazy(() => import("@pages/Profile"));
const Home = React.lazy(() => import("@pages/Home"));
const ProfileEdit = React.lazy(() => import("@pages/Profile/Edit/index"));

// 将 tab 按钮的数据放在一个数组中
// - id 唯一性ID
// - title 按钮显示的文本
// - to 点击按钮后切换到的页面路径
// - icon 按钮上显示的图标名称
const buttons = [
  { id: 1, title: "首页", to: "/home", icon: "iconbtn_home" },
  { id: 2, title: "问答", to: "/home/question", icon: "iconbtn_qa" },
  { id: 3, title: "视频", to: "/home/video", icon: "iconbtn_video" },
  { id: 4, title: "我的", to: "/home/profile", icon: "iconbtn_mine" },
];
// 获取地址栏中的路由信息
export default function Layouts() {
  // 获取地址栏路由信息
  const location = useLocation();
  const history = useHistory();
  return (
    <div className={styles.root}>
      {/* 区域一：点击按钮切换显示内容的区域 */}
      <div className="tab-content"></div>
      {/* 路由信息配置 */}
      <Suspense fallback="<div>loading...123</div>">
        <Switch>
          <Route path="/home" exact component={Home}></Route>
          <Route path="/home/question" component={Question}></Route>
          <Route path="/home/video" component={Video}></Route>
          <AuthRoute path="/home/profile" component={Profile}></AuthRoute>
          <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
        </Switch>
      </Suspense>
      {/* 区域二：按钮区域，会使用固定定位显示在页面底部 */}
      <div className="tabbar">
        {buttons.map((item) => {
          // 判断当前地址和点击的地址是否相同，家action属性
          const selected = item.to === location.pathname;
          return (
            <div
              className={classNames(
                "tabbar-item",
                selected ? "tabbar-item-active" : ""
              )}
              key={item.id}
              onClick={() => history.push(item.to)}
            >
              <Icon type={item.icon + (selected ? "_sel" : "")} />
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
