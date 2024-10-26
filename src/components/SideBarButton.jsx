"use client";

import { Button, Typography } from "antd";
import { Icon } from "@iconify/react";
import { useSettingsContext } from "@/context/settings/settings-context";

const SidebarButton = ({ onClick }) => {
  const { setSettings } = useSettingsContext();
  const handleClick = () => {
    setSettings((prev) => ({
      ...prev,
      isSidebarOpen: !prev.isSidebarOpen,
    }));
  };
  return (
    <Button
      type="text"
      onClick={handleClick}
      icon={
        <Typography>
          <Icon icon="icon-pantone:menu" width="22px" />
        </Typography>
      }
    />
  );
};

export default SidebarButton;
