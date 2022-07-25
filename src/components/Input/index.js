import React, { useState } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
export default function Login({
  type,
  onExtraClick,
  className,
  extra,
  value,
  onChange,
  ...rest
}) {
  const [text, setText] = useState(value);
  const onChangeValue = (e) => {
    setText(e.target.value);
    // 执行外部接收的onChange事件
    onChange(e);
  };
  return (
    <div className={styles.root}>
      <input
        type="type"
        className={classNames("input", className)}
        value={text}
        onChange={onChangeValue}
        {...rest}
      />
      {extra && (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      )}
    </div>
  );
}
