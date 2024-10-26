"use client";

import React from "react";
import styles from "@/styles/Sidebar.module.css";
import Box from "./Box";
import { sidebarRoutes } from "@/lib/sidebarRoutes";
import { Typography } from "antd";
import Link from "next/link";
import { Icon } from "@iconify/react";
import cx from "classnames";
import SidebarContainer from "./SidebarContainer";
import { usePathname, useRouter } from "next/navigation";
import { useSettingsContext } from "@/context/settings/settings-context";
import { useClerk, useUser } from "@clerk/nextjs";
const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="sidebar-wrapper">
      <Box className="sidebar-container">
        {sidebarRoutes().map(
          (route, index) =>
            route.route && (
              <Link key={index} href={route.route}>
                <Typography>
                  <Icon icon={route.icon} width={"25px"} />
                </Typography>
                <Typography>{route.name}</Typography>
              </Link>
            )
        )}
        <Link
          href={""}
          onClick={() => {
            signOut(() => router.push("/sign-in"));
          }}
        >
          <Typography>
            <Icon icon={"ri:logout-box-line"} width={"25px"} />
          </Typography>
          <Typography>Sign Out</Typography>
        </Link>
      </Box>
    </div>
  );
};

export default Sidebar;
