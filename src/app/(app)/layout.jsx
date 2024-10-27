import React from "react";
import { SettingsContextProvider } from "../../context/settings/settings-provider";
import ThemeProvider from "@/lib/ThemeProvider/index";
import Box from "@/components/Box";
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import "@/styles/homeLayout.module.css";

const Homelayout = ({ children }) => {
  return (
    <SettingsContextProvider>
      <ThemeProvider>
        <Box
          type="baseBg"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <div className="home-wrapper">
            <Header />
            <div className="home-container">
              <Sidebar />
            </div>
            <div className="page-body">{children}</div>
          </div>
        </Box>
      </ThemeProvider>
    </SettingsContextProvider>
  );
};
export default Homelayout;
