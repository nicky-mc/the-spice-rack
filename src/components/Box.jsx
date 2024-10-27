"use client";
import React from "react";
import { theme } from "antd";

const { useToken } = theme;
const Box = ({ children, type = "boxBg", style, ...other }) => {
  const { token } = useToken();
  return (
    <div
      {...other}
      style={{
        backgroundColor: token[type], // Use the token for background color
        boxShadow: "0px 4px 10px 1px rgba(0, 0, 0, 0.03)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
export default Box;
