import React from "react";
import Input from "@components/Input";
import styles from "./index.module.scss";
export default function EditInput({ onClose }) {
  const onChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className={styles.root}>
      <div className="content">
        <Input onChange={onChange}></Input>
      </div>
    </div>
  );
}
