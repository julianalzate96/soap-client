import React from "react";
import { Link } from "react-router-dom";
import APIT from "../../images/APIT-logo.jpeg";

import "../../styles/_header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://www.politecnicojic.edu.co/images/logo/logo.png"
            alt="Logo PCJIC"
          />
        </Link>
      </div>
      <div className="logo-apit-container">
        <a
          href="https://web.facebook.com/apitpolijic/?_rdc=1&_rdr"
          target="_blank"
          rel="noreferrer"
        >
          <img src={APIT} alt="Logo APIT" />
        </a>
      </div>
    </header>
  );
}
