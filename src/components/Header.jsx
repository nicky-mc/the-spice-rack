"use client";
import React from "react";
import css from "../styles/header.module.css";
import Box from "./Box";
import Image from "next/image";
import { Flex } from "antd";
import ModeButton from "./ModeButton";
import { UserButton } from "@clerk/nextjs";
import SidebarButton from "./SideBarButton";

const Header = () => {
  return (
    <header className="header-wrapper">
      <Box style={{ height: "100%" }}>
        <div className="header-container">
          <div className="sidebar-button">
            <SidebarButton />
          </div>

          <Image
            src="/spice.png"
            alt="Spice Rack Logo"
            width={90}
            height={90}
          />
          <Flex gap={25} align="center">
            <ModeButton />
            <UserButton afterSignoutUrl="/sign-in" />
          </Flex>
        </div>
      </Box>
    </header>
  );
};

export default Header;
