import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ServiceContext from "../../context/serviceContext";
import ServiceCard from "./ServiceCard";

import "../../styles/_card.scss";

function Card({ category }) {
  const { setService } = useContext(ServiceContext);

  const handleOnClick = (wsdl, name, id) => {
    setService({ wsdl, name, id });
  };

  return (
    <div className="card">
      <h2>{category.nombre}</h2>
      <p>{category.descripcion}</p>
      <span>aqui podra ver el WSDL.</span>
      <a className="wsdl" href={category.wsdl} target="_blank" rel="noreferrer">
        {category.wsdl}
      </a>
      <Link
        className="services-button"
        to={`/${category.nombre.replace(/\s/g, "-").toLowerCase()}`}
        onClick={() =>
          handleOnClick(category.wsdl, category.nombre, category.id_categoria)
        }
      >
        Ver Servicios
      </Link>
    </div>
  );
}

Card.ServiceCard = ServiceCard;

export default Card;
