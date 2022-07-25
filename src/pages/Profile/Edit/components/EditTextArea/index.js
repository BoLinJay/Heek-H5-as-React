import styles from "./index.module.scss";
import React, { useState } from "react";
import classnames from "classnames";
/**
 * 带字数统计的多行文本
 * @param {String} className 样式类
 * @param {String} value 文本框的内容
 * @param {String} placeholder 占位文本
 * @param {Function} onChange 输入内容变动事件
 * @param {String} maxLength 允许最大输入的字数（默认100个字符）
 */
export default function TextArea({
  className,
  value,
  onChange,
  maxLength = 150,
  placeholder,
  ...res
}) {
  const [text, setText] = useState(value);
  const [length, setLength] = useState(0);
  const onValueChange = (e) => {
    const newText = e.target.value;
    setLength(newText.length);
    setText(newText);
    // 外部传入的onchange函数也需要调用
    onChange(e);
  };
  return (
    <div className={classnames(styles.root, className)}>
      <textarea
        className="textarea"
        value={text}
        onChange={onValueChange}
        maxLength={maxLength}
        placeholder={placeholder}
        {...res}
      ></textarea>
      <div className="count">
        {length}/{maxLength}
      </div>
    </div>
  );
}
