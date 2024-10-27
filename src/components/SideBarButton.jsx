"use client";
import { Button, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSettingsContext } from "@/context/settings/settings-context";

const SidebarButton = ({ onClick }) => {
  const { setSettings, settings } = useSettingsContext();
  return (
    <Button
      type="text"
      onClick={() => {
        setSettings((prev) => ({
          ...prev,
          isSidebarOpen: !prev.isSidebarOpen,
        }));
      }}
      icon={
        <Typography>
          <FontAwesomeIcon icon={faBars} width="22px" />
        </Typography>
      }
      className="sidebar-button"
    />
  );
};

export default SidebarButton;
