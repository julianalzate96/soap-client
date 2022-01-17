import React from "react";

import "../../styles/_service_card.scss";

export default function ServiceCard({ service, onClick }) {
  return (
    <div className="service-card" onClick={onClick}>
      <h3>{service.nombre}</h3>
      <p>
        {service.descripcion ||
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
      </p>
      <a className="wsdl" href={service.wsdl} target="_blank" rel="noreferrer">
        {service.wsdl}
      </a>
    </div>
  );
}
