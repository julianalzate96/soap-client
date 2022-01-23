import React from "react";
import { useSelector } from "react-redux";

import "../../styles/_service_card.scss";

export default function ServiceCard({ service, onClick }) {
  const { token } = useSelector((state) => state.token);

  const isPrivate = service.privado === "1";

  return (
    <div
      className={`service-card ${!token && isPrivate ? `priv-service` : ``}`}
      onClick={!isPrivate ? onClick : token ? onClick : () => {}}
    >
      <h3>{service.nombre}</h3>
      <p>
        {service.descripcion ||
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
      </p>
      <a
        className="wsdl"
        href={!isPrivate ? service.wsdl : token ? service.wsdl : `#privado`}
        target="_blank"
        rel="noreferrer"
      >
        {!isPrivate
          ? service.wsdl
          : token
          ? service.wsdl
          : `WSDL NO DISPONIBLE`}
      </a>

      {!token && isPrivate && (
        <span>
          <strong>PRIVADO</strong>
        </span>
      )}
    </div>
  );
}
