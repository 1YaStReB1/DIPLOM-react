import React from "react";
import "../../styles/Navbar/navbar.scss";
const NavBar = () => {
  return (
    
      <nav className="nav">
        <div className="nav__logo"></div>
        <div className="nav__items">
          <div className="nav__item">Ручная разметка</div>
          <div className="nav__item">Оптический поток</div>
          <div className="nav__item">Настройки</div>
        </div>
      </nav>
    
  );
};

export default NavBar;
