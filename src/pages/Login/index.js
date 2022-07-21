import React from "react";
import NavBar from "@/components/NavBar";
import styles from "./index.module.scss";
import Input from "@components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";
export default function Login() {
  // 表单验证
  /*   const validate = (values) => {
    const errors = {};
    if (!values.account) {
      errors.account = "请输入手机号";
    }
    if (!values.code) {
      errors.code = "请输入验证码";
    }
    return errors;
  }; */

  const formik = useFormik({
    initialValues: {
      account: "",
      code: "",
    },
    onSubmit: () => {
      console.log(formik.values);
    },
    // yup表单验证方法
    validationSchema: Yup.object({
      account: Yup.string()
        .required("请输入手机号")
        .matches(/^1[3-9]\d{9}$/, "手机号格式错误"),
      code: Yup.string()
        .required("请输入6位验证码")
        .matches(/^\d{6}/, "验证码格式不正确"),
    }),
  });

  const {
    values: { account, code },
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    isValid,
  } = formik;

  // 发送验证码
  const onExtraClick = () => {
    console.log(123);
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
                name="account"
                placeholder="请输入手机号"
                onChange={handleChange}
                onBlur={handleBlur}
                value={account}
                maxLength="11"
              ></Input>
              {touched.account && errors.account && (
                <div className="validate">{errors.account}</div>
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
                onExtraClick={onExtraClick}
                value={code}
                extra="发送验证码"
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
