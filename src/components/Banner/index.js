import React from "react";

import "../../styles/_banner.scss";

import IMAGE from "../../images/portal-de-servicios.jpg";

export default function Banner() {
  return (
    <div className="banner">
      <img loading="lazy" src={IMAGE} alt="banner" />
    </div>
  );
}
