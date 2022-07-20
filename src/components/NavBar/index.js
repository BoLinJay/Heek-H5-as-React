import React from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useHistory } from 'react-router'
export default function NavBar({children, extra}) {
    const history = useHistory()
    // 回退
    const callback = () => {
        history.go(-1)
    }
  return (
    <div className={styles.root}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={callback} />
      </div>
      {/* 居中标题 */}
      <div className="title">{children}</div>

      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  )
}