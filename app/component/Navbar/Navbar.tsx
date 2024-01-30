import React from "react";
import style from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.navbarWrapper}>
      <div>Home</div>
      <div>About</div>
    </div>
  );
};

export default Navbar;
