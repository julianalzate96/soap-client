import React from "react";
import Banner from "../Banner";
import Header from "../Header";

import "../../styles/_layout.scss";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <Banner />
      <main>{children}</main>
    </div>
  );
}
