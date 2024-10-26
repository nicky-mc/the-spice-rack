"use client";
import {
  useSettingsContext,
  useThemeContext,
} from "@/context/settings/settings-context";
import { Icon } from "@iconify/react";
import { Button } from "antd";
import React from "react";

const ModeButton = () => {
  const { setSettings } = useSettingsContext();
  return (
    <Button
      style={{ padding: 0, border: "none" }}
      onClick={() => {
        setSettings((prev) => ({
          ...prev,
          theme: prev.theme === "dark" ? "light" : "dark",
        }));
      }}
      icon={<Icon icon="mdi:theme-light-dark" width={"35px"} />}
    />
  );
};
export default ModeButton;
