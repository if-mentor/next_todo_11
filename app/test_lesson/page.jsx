"use client";

import ReactDOM from "react-dom";
import React, { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    setCount((count) => count + 1);
  };

  const handleDecrease = () => {
    setCount((count) => count - 1);
  };

  const handleDouble = () => {
    setCount((count) => count * 2);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1> カウント{count} </h1>
      <button style={{ fontSize: "20px" }} onClick={handleIncrease}>
        プラス
      </button>
      <button style={{ fontSize: "20px" }} onClick={handleDecrease}>
        マイナス
      </button>
      <button style={{ fontSize: "20px" }} onClick={handleDouble}>
        ２倍
      </button>
      <button style={{ fontSize: "20px" }} onClick={handleReset}>
        リセット
      </button>
      {count >= 10 && (
        <div style={{ fontSize: "24px", marginTop: "40px" }}>
          10以上になりました。
        </div>
      )}
      {count <= 0 && (
        <div style={{ fontSize: "24px", marginTop: "40px" }}>
          0以下になりました。
        </div>
      )}
    </div>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
