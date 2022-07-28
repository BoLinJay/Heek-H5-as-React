import React from "react";
import Tabs from "@components/Tabs";
export default function Home() {
  const tabs = [
    { id: 1, name: "频道1" },
    { id: 2, name: "频道2" },
    { id: 3, name: "频道2" },
    { id: 4, name: "频道2" },
    { id: 5, name: "频道2" },
    { id: 6, name: "频道2" },
    { id: 7, name: "频道2" },
  ];
  return (
    <div>
      <Tabs tabs={tabs}></Tabs>
    </div>
  );
}
