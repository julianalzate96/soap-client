import React from "react";
import { Link } from "react-router-dom";

import "../../styles/_service_card.scss";

export default function ServiceCard({ service, onClick }) {
  console.log(service);
  return (
    <div className="service-card" onClick={onClick}>
      <h3>{service.name}</h3>
      <p>
        {service.description ||
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
      </p>
      {/* <span>aqui podra ver el wsdl de los servicios.</span>
      <a className="wsdl" href={service.wsdl} target="_blank">
        {service.wsdl}
      </a>
      <Link
        to={`/${service.nombre.replace(/\s/g, "-").toLowerCase()}`}
        // onClick={() =>
        //   handleOnClick(service.wsdl, service.nombre, service.id_categoria)
        // }
      >
        Ver Servicios
      </Link> */}
    </div>
  );
}
