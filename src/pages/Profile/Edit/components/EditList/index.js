import React from "react";
import { Popover } from "antd-mobile";
import { useDispatch } from "react-redux";
import { updateProfile } from "@@/src/store/action/profile";
export default function EditList({
  type,
  photoSolt,
  sexSolt,
  config,
  inputRef,
  ...rest
}) {
  const dispatch = useDispatch();
  const formDateonClick = () => {
    //   调用fileinput框选择文件
    inputRef.current.click();
  };
  return (
    <div>
      <Popover.Menu
        actions={
          type === Object.keys(config)[0]
            ? config[Object.keys(config)[0]].map((action) => ({ ...action }))
            : config[Object.keys(config)[1]].map((action) => ({ ...action }))
        }
        onAction={(node) =>
          type === "gender"
            ? node.id === 1
              ? dispatch(updateProfile("gender", 1))
              : dispatch(updateProfile("gender", 0))
            : node.id === 2 && formDateonClick()
        }
        placement="bottom-start"
        trigger="click"
        {...rest}
      >
        {/* 插槽 */}
        {
          <div>
            {photoSolt}
            {sexSolt}
          </div>
        }
      </Popover.Menu>
    </div>
  );
}
