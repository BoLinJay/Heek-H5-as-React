import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function NotFond() {
  const [time, setTime] = useState(3);
  const history = useHistory();
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });
  useEffect(() => {
    if (time === 0) {
      history.push("/");
    }
  }, [time, history]);
  return (
    <div>
      <h1>您访问的页面不存在</h1>
      {time}s<Link to="/">首页</Link>
    </div>
  );
}
