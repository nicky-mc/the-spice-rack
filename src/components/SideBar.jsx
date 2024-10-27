"use client";
import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/Sidebar.module.css";
import Box from "./Box";
import { sidebarRoutes } from "@/lib/sidebarRoutes";
import { Typography } from "antd";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import { useSettingsContext } from "@/context/settings/settings-context";
import { useClerk, useUser } from "@clerk/nextjs";
import cx from "classnames";

const Sidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { signOut } = useClerk();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    settings: { isSidebarOpen },
    setSettings,
  } = useSettingsContext();

  const handleDrawerClose = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isSidebarOpen: false,
    }));
  }, [setSettings]);

  useEffect(() => {
    if (isSidebarOpen) {
      handleDrawerClose();
    }
  }, [pathname, handleDrawerClose]);

  const isActive = (route) => {
    return route.route === pathname ? styles.active : "";
  };

  return (
    <div
      className={cx(styles["sidebar-wrapper"], {
        [styles.open]: isSidebarOpen,
      })}
    >
      <Box className={styles["sidebar-container"]}>
        {sidebarRoutes().map(
          (route, index) =>
            route.route && (
              <Link
                key={index}
                href={route.route}
                className={cx(styles.item, isActive(route))}
              >
                <Typography>
                  <FontAwesomeIcon icon={route.icon} width={"25px"} />
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
          className={styles.item}
        >
          <Typography>
            <FontAwesomeIcon icon={["fas", "sign-out-alt"]} width={"25px"} />
          </Typography>
          <Typography>Sign Out</Typography>
        </Link>
      </Box>
    </div>
  );
};

export default Sidebar;
