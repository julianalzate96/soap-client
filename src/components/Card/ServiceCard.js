import React, { useEffect, useState } from "react";

import "../../styles/_service_card.scss";

export default function ServiceCard({ service, onClick }) {
  const [isPrivado, setIsPrivado] = useState(false);
  useEffect(() => {
    let _isPrivado = localStorage.getItem("token")
      ? false
      : service.privado === "1";

    setIsPrivado(_isPrivado);
  }, [localStorage]);
  return (
    <div
      className={`service-card ${isPrivado ? `priv-service` : ``}`}
      onClick={!isPrivado ? onClick : () => {}}
    >
      <h3>{service.nombre}</h3>
      <p>
        {service.descripcion ||
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
      </p>
      <a
        className="wsdl"
        href={!isPrivado ? `#privado` : service.wsdl}
        target="_blank"
        rel="noreferrer"
      >
        {!isPrivado ? service.wsdl : `WSDL NO DISPONIBLE`}
      </a>

      {isPrivado && (
        <span>
          <strong>PRIVADO</strong>
        </span>
      )}
    </div>
  );
}
