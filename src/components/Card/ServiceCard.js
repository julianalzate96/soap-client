import React from "react";

import "../../styles/_service_card.scss";

export default function ServiceCard({ service, onClick }) {
  return (
    <div className="service-card" onClick={onClick}>
      <h3>{service.name}</h3>
      <p>
        {service.description ||
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
      </p>
    </div>
  );
}
