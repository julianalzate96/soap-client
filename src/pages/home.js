import React, { useContext } from "react";
import Lottie from "lottie-react";

import CategoriesContext from "../context/categoriesContext";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Loading from "../animations/loading-yellow.json";

export default function Home() {
  const { categories } = useContext(CategoriesContext);

  const renderServices = () => {
    return categories.map((category, i) => (
      <Card key={i} category={category} />
    ));
  };

  return (
    <Layout>
      <div>
        <p>
          Los Servicios Web de{" "}
          <strong>
            Área de Programas Informáticos y de Telecomunicaciones
          </strong>{" "}
          del <strong>Politécnico Colombiano Jaime Isaza Cadavid</strong> no
          precisan de ningún usuario y contraseña para acceder a ellos. Estos
          devuelven información pública y accesible por toda la comunidad y que
          se puede encontrar en el sitio web institucional.
        </p>
        <p>Estos estan ordenados en las siguientes Secciones:</p>
      </div>
      <div className="categories-container">
        {categories.length > 0 ? (
          renderServices()
        ) : (
          <Lottie className="loading" animationData={Loading} />
        )}
      </div>
    </Layout>
  );
}
