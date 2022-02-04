import React from "react";

import Banner from "../Banner";
import Header from "../Header";

import "../../styles/_layout.scss";
import NavBar from "../NavBar";

export default function Layout(props) {
  return (
    <div className="layout">
      <Header />
      <Banner />

      <main>
        <NavBar />
        {props.children}
      </main>
    </div>
  );
}
