import React from "react";

import APIT from "../../images/APIT-logo.jpeg";

import "../../styles/_header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="https://www.politecnicojic.edu.co/images/logo/logo.png"
          alt="Logo PCJIC"
        />
      </div>
      <div className="logo-apit-container">
        <img src={APIT} alt="Logo APIT" />
      </div>
    </header>
  );
}
