import React from "react";

import "../../styles/_banner.scss";

import IMAGE from "../../images/proceso-grados-privados.png";

export default function Banner() {
  return (
    <div className="banner">
      <img src={IMAGE} alt="banner" />
    </div>
  );
}
