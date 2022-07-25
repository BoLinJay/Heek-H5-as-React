import React, { useRef, useState } from "react";
import NavBar from "@/components/NavBar";
import { List, Modal, Toast, Dialog } from "antd-mobile";
import styles from "./index.module.scss";
import EditInput from "./components/EditInput";
import EditList from "./components/EditList";
import {
  UserCircleOutline,
  SmileOutline,
  CollectMoneyOutline,
  FlagOutline,
  ChatCheckOutline,
} from "antd-mobile-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  findUser,
  updateAvatar,
  updateProfile,
} from "@@/src/store/action/profile";
import { logout } from "@@/src/store/action/login";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ProfileEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  // 拿到个人资料数据
  const userEdit = useSelector((state) => state.profile.profile);
  useEffect(() => {
    dispatch(findUser());
  }, [dispatch]);

  // 拿到EditInput的value
  const [inputValue, setInputValue] = useState("");
  const ref = React.useRef();
  useEffect(() => {
    ref.current = inputValue;
  }, [inputValue]);
  const handleChange = (value) => {
    setInputValue(value);
  };
  // EditList渲染数据
  const config = {
    avatar: [
      {
        id: 1,
        text: "拍照",
      },
      {
        id: 2,
        text: "本地选择",
      },
    ],
    gender: [
      {
        id: 1,
        text: "男",
      },
      {
        id: 2,
        text: "女",
      },
    ],
  };
  // 选择文件表单
  const fileRef = useRef();
  const inputFile = (e) => {
    // 获取选中的图片文件
    const file = e.target.files[0];

    // 生成表单数据
    const formData = new FormData();
    formData.append("photo", file);

    // 调用 Action 进行上传和 Redux 数据更新
    dispatch(updateAvatar(formData)).then(() => {
      Toast.show({
        icon: "success",
        content: "上传成功",
      });
    });
  };
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
                <EditList
                  type="avatar"
                  photoSolt={
                    <img src={userEdit.photo} alt="" className="profile_img" />
                  }
                  config={config}
                  inputRef={fileRef}
                ></EditList>
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
                Modal.confirm({
                  title: "编辑昵称",
                  content: (
                    <div>
                      <EditInput
                        type="name"
                        value={userEdit.name}
                        handleChange={handleChange}
                      />
                    </div>
                  ),
                  // 提交按钮
                  onConfirm: async () => {
                    await dispatch(updateProfile("name", ref.current));
                    // 成功提示
                    Toast.show({
                      icon: "success",
                      content: "提交成功",
                      position: "bottom",
                    });
                  },
                });
              }}
            >
              昵称
            </List.Item>
            {/* 简介 */}
            <List.Item
              prefix={<CollectMoneyOutline />}
              onClick={() => {
                // 弹窗
                Modal.confirm({
                  title: "编辑简介",
                  content: (
                    <div>
                      <EditInput
                        type="intro"
                        value={userEdit.intro || ""}
                        handleChange={handleChange}
                      />
                    </div>
                  ),
                  // 提交按钮
                  onConfirm: async () => {
                    await dispatch(updateProfile("intro", ref.current));
                    // 成功提示
                    Toast.show({
                      icon: "success",
                      content: "提交成功",
                      position: "bottom",
                    });
                  },
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
              extra={
                // 气泡弹出框
                <EditList
                  sexSolt={userEdit.gender === 1 ? "男" : "女"}
                  type="gender"
                  config={config}
                ></EditList>
              }
            >
              性别
            </List.Item>
          </List>
        </div>
      </div>
      {/* 选择文件 */}
      <input
        type="file"
        ref={fileRef}
        onChange={inputFile}
        style={{ display: "none" }}
      />
      {/* 底部栏：退出登录按钮 */}
      <div className="logout">
        <button
          className="btn"
          onClick={async () => {
            const result = await Dialog.confirm({
              content: "你真的要退出登录吗",
            });
            if (result) {
              dispatch(logout());
              history.push("/login");
              Toast.show({
                icon: "success",
                content: "退出成功",
                position: "bottom",
              });
            }
          }}
        >
          退出登录
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
