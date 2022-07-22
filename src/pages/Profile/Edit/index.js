import React, { useRef, useState } from "react";
import NavBar from "@/components/NavBar";
import { List, Modal } from "antd-mobile";
import { useHistory } from "react-router-dom";
import styles from "./index.module.scss";
import EditCard from "./components/EditCard";
import EditInput from "./components/EditInput";
import {
  UserCircleOutline,
  SmileOutline,
  CollectMoneyOutline,
  FlagOutline,
  ChatCheckOutline,
  ExclamationCircleFill,
} from "antd-mobile-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findUser } from "@@/src/store/action/profile";

const ProfileEdit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // 拿到个人资料
  const userEdit = useSelector((state) => state.profile.profile);
  useEffect(() => {
    dispatch(findUser());
  }, [dispatch]);
  const [inputOpen, setInputOpen] = useState({
    type: "",
  });
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部组件 */}
        <NavBar>我的信息</NavBar>
        {/* 列表 */}
        <div className="wrapper">
          <List className="profile-list">
            {/* 头像 */}
            <List.Item
              prefix={<UserCircleOutline />}
              extra={
                <img src={userEdit.photo} alt="" className="profile_img" />
              }
            >
              头像
            </List.Item>

            {/* 电话 */}
            <List.Item prefix={<ChatCheckOutline />} extra={userEdit.mobile}>
              电话
            </List.Item>
          </List>

          {/* 第二列表 */}
          <List className="profile-list">
            {/* 昵称 */}
            <List.Item
              prefix={<SmileOutline />}
              extra={userEdit.name}
              onClick={() => {
                setInputOpen({ type: "name" });
                // 弹窗
                Modal.confirm({
                  content: (
                    <div>
                      <EditInput />
                    </div>
                  ),
                });
              }}
            >
              昵称
            </List.Item>
            {/* 简介 */}
            <List.Item
              prefix={<CollectMoneyOutline />}
              onClick={() => {
                setInputOpen({ type: "intro" });
                // 弹窗
                Modal.confirm({
                  content: (
                    <div>
                      <EditInput />
                    </div>
                  ),
                });
              }}
              extra={
                <span className="intro">
                  {userEdit.intro ? userEdit.intro : "你太懒了，简介都还没写"}
                </span>
              }
            >
              简介
            </List.Item>

            {/* 性别 */}
            <List.Item
              prefix={<FlagOutline />}
              onClick={() => {}}
              extra={userEdit.gender === 1 ? "男" : "女"}
            >
              性别
            </List.Item>
          </List>
        </div>
      </div>
      {/* 底部栏：退出登录按钮 */}
      <div className="logout">
        <button className="btn">退出登录</button>
      </div>
    </div>
  );
};

export default ProfileEdit;
