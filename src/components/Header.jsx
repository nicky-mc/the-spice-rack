import React from "react";
import styles from "../styles/header.module.css";
import Box from "./Box";
import Image from "next/image";
import { Flex } from "antd";
import ModeButton from "./ModeButton";
import { UserButton } from "@clerk/nextjs";
import SidebarButton from "./SidebarButton";

const Header = () => {
  return (
    <header className={styles["header-wrapper"]}>
      <Box style={{ height: "100%" }}>
        <div className={styles["header-container"]}>
          <div className={styles["left-container"]}>
            <SidebarButton />
            <Image
              src="/spice.png"
              alt="Spice Rack Logo"
              width={90}
              height={90}
              className={styles.logo}
            />
          </div>
          <div className={styles["right-container"]}>
            <ModeButton />
            <UserButton afterSignoutUrl="/sign-in" />
          </div>
        </div>
      </Box>
    </header>
  );
};

export default Header;
