import React from "react";
import "../../styles/Navbar/navbar.scss";
import { Link, NavLink, Outlet } from "react-router-dom";


const NavBar = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav__logo"></div>
        <div className="nav__items">
        <NavLink to="/" className="nav__item">Ручная разметка</NavLink>
        <NavLink to="/opt" className="nav__item">Оптический поток</NavLink>
        <NavLink to="/settings" className="nav__item">Настройки</NavLink>
        </div>
      </nav>
    <Outlet/>
    </>
  );
};

export default NavBar;
