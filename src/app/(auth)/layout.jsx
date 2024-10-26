import React from "react";
import Image from "next/image";
import css from "@/styles/authLayout.module.css";
export const metadata = {
  title: "Sign in/up to The Spice Rack",
  description: "Sign in to your account or create a new account",
};
const AuthLayout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.left}>{children}</div>
        <div className={css.right}>
          <Image
            src="/spice.png"
            alt="Spice Rack Logo"
            width={600}
            height={600}
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
