import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import styles from "./index.module.scss";
import Input from "@components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
import { findCode, findToken } from "@@/src/store/action/login";
import { Toast } from "antd-mobile";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function Login() {
  // 表单验证
  /*   const validate = (values) => {
    const errors = {};
    if (!values.mobile) {
      errors.mobile = "请输入手机号";
    }
    if (!values.code) {
      errors.code = "请输入验证码";
    }
    return errors;
  }; */
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      mobile: "18888888888",
      code: "246810",
    },
    // 登录按钮
    onSubmit: async (values) => {
      try {
        console.log(values);
        await dispatch(findToken(values));
        history.push("/home");
        Toast.show({
          icon: "success",
          content: "登录成功",
        });
      } catch (e) {
        Toast.fail(e.response.data.message);
      }
    },
    // yup表单验证方法
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("请输入手机号")
        .matches(/^1[3-9]\d{9}$/, "手机号格式错误"),
      code: Yup.string()
        .required("请输入6位验证码")
        .matches(/^\d{6}/, "验证码格式不正确"),
    }),
  });

  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    isValid,
  } = formik;

  // 发送验证码
  const dispatch = useDispatch();
  const [time, setTime] = useState(0);

  const sendSMSCode = async () => {
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true,
      });
      return;
    }

    try {
      const mobile = formik.values.mobile;
      await dispatch(findCode(mobile));
      Toast.show({
        icon: "success",
        content: "获取验证码成功",
      });
      // 倒计时
      setTime(5);
      const timeId = setInterval(() => {
        setTime((time) => {
          if (time === 1) {
            clearInterval(timeId);
          }
          return time - 1;
        });
      }, 1000);
    } catch (error) {
      Toast.show({
        content: error.response.data.message,
        maskClickable: false,
      });
    }
  };
  return (
    <div className={styles.root}>
      <NavBar>登录</NavBar>
      <div className="content">
        {/* 标题 */}
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          {/* 手机号输入框 */}
          <div className="input-item">
            <div className="input-box">
              <Input
                type="tel"
                name="mobile"
                placeholder="请输入手机号"
                onChange={handleChange}
                onBlur={handleBlur}
                value={mobile}
                maxLength="11"
              ></Input>
              {touched.mobile && errors.mobile && (
                <div className="validate">{errors.mobile}</div>
              )}
            </div>
          </div>

          {/* 短信验证码输入框 */}
          <div className="input-item">
            <div className="input-box">
              <Input
                type="tel"
                name="code"
                placeholder="请输入验证码"
                onChange={handleChange}
                onBlur={handleBlur}
                onExtraClick={time === 0 ? sendSMSCode : () => {}}
                value={code}
                extra={time === 0 ? "发送验证码" : `${time}s后发送验证码`}
                maxLength="6"
              ></Input>
            </div>
            {touched.code && errors.code && (
              <div className="validate">{errors.code}</div>
            )}
          </div>

          {/* 登录按钮 */}
          <button
            type="submit"
            className={classNames("login-btn", { disabled: !isValid })}
            disabled={!isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}
