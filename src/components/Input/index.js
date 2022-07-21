import React from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
export default function Login({
  type,
  onExtraClick,
  className,
  extra,
  ...rest
}) {
  return (
    <div className={styles.root}>
      <input type="type" className={classNames("input", className)} {...rest} />
      {extra && (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      )}
    </div>
  );
}
