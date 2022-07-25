import React from "react";
import Input from "@components/Input";
import styles from "./index.module.scss";
import ExitTextArea from "../EditTextArea";
/**
 *
 * @param {type} 名称 name /intro
 * @param {value} name/intro的 数据
 * @returns
 */
export default function EditInput({ type, value, handleChange }) {
  const onChange = (e) => {
    const inputValue = e.target.value;
    handleChange(inputValue);
  };
  const onChangeText = (e) => {
    const TextArea = e.target.value;
    handleChange(TextArea);
  };

  return (
    <div className={styles.root}>
      <div className="content">
        {type === "name" ? (
          <Input onChange={onChange} placeholder="请输入昵称" value={value} />
        ) : (
          <ExitTextArea
            onChange={onChangeText}
            placeholder="请输入简介"
            value={value}
          />
        )}
      </div>
    </div>
  );
}
