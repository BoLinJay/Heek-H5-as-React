// 卡片弹窗
import React from "react";
import { Card, Toast, Button } from "antd-mobile";
import { AntOutline, RightOutline } from "antd-mobile-icons";
import styles from "./index.module.scss";

export default function EditCard() {
  // 卡片
  const onHeaderClick = () => {
    Toast.show("点击了卡片Header区域");
  };

  const onBodyClick = () => {
    Toast.show("点击了卡片Body区域");
  };
  return (
    <div>
      {/* 卡片弹窗 */}
      <Card
        title={
          <div style={{ fontWeight: "normal" }}>
            <AntOutline style={{ marginRight: "4px", color: "#1677ff" }} />
            卡片标题
          </div>
        }
        extra={<RightOutline />}
        onBodyClick={onBodyClick}
        onHeaderClick={onHeaderClick}
        style={{ borderRadius: "16px" }}
      >
        <div className={styles.content}>卡片内容</div>
        <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
          <Button
            color="primary"
            onClick={() => {
              Toast.show("点击了底部按钮");
            }}
          >
            底部按钮
          </Button>
        </div>
      </Card>
    </div>
  );
}
