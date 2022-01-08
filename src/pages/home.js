import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ServiceContext from "../context/serviceContext";
import CategoriesContext from "../context/categoriesContext";

export default function Home() {
  const { categories } = useContext(CategoriesContext);
  const { setService } = useContext(ServiceContext);

  const handleOnClick = (wsdl, name, id) => {
    setService({ wsdl, name, id });
  };

  const renderServices = () => {
    return categories.map((category, i) => (
      <Link
        key={i}
        to={`/${category.nombre.replace(/\s/g, "-").toLowerCase()}`}
        onClick={() =>
          handleOnClick(category.wsdl, category.nombre, category.id_categoria)
        }
      >
        {category.nombre}
      </Link>
    ));
  };

  return <div>{renderServices()}</div>;
}
