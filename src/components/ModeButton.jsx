"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { useSettingsContext } from "@/context/settings/settings-context";
import { Button } from "antd";

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
      icon={<FontAwesomeIcon icon={faToggleOn} width={"35px"} />}
      className="mode-button"
    />
  );
};

export default ModeButton;
