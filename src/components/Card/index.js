import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { transformTitleToPath } from "../../utils";
import { setCurrentCategory } from "../../redux/actions/category.actions";
import ServiceCard from "./ServiceCard";

import "../../styles/_card.scss";

function Card({ category }) {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    let data = {
      name: category.nombre,
      id: category.id_categoria,
      description: category.descripcion,
    };
    dispatch(setCurrentCategory(data));
  };

  return (
    <div className="card">
      <h2>{category.nombre}</h2>
      <p>{category.descripcion}</p>
      <Link
        className="services-button"
        to={`/${transformTitleToPath(category.nombre)}`}
        onClick={handleOnClick}
      >
        Ver Servicios
      </Link>
    </div>
  );
}

Card.ServiceCard = ServiceCard;

export default Card;
