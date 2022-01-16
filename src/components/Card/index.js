import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ServiceContext from "../../context/serviceContext";
import ServiceCard from "./ServiceCard";

import "../../styles/_card.scss";

function Card({ category }) {
  const { setService } = useContext(ServiceContext);

  const handleOnClick = () => {
    let data = {
      name: category.nombre,
      id: category.id_categoria,
      description: category.descripcion,
    };
    setService(data);
    localStorage.setItem("service", JSON.stringify(data));
  };

  return (
    <div className="card">
      <h2>{category.nombre}</h2>
      <p>{category.descripcion}</p>
      <Link
        className="services-button"
        to={`/${category.nombre.replace(/\s/g, "-").toLowerCase()}`}
        onClick={handleOnClick}
      >
        Ver Servicios
      </Link>
    </div>
  );
}

Card.ServiceCard = ServiceCard;

export default Card;
