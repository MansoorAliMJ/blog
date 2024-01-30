import React from "react";
import style from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={style.navbarWrapper}>
      <Link href={"/"} className={style.nabarselected}>
        HOME
      </Link>
      <Link href={"https://www.linkedin.com/in/mansooralij/"}>ABOUTME</Link>
    </div>
  );
};

export default Navbar;
