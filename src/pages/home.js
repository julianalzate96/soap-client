import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";

import Layout from "../components/Layout";
import Card from "../components/Card";

import Loading from "../animations/loading-yellow.json";
import { setCurrentCategory } from "../redux/actions/category.actions";

export default function Home() {
  const {
    loading,
    error,
    data: categories,
  } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const renderServices = () => {
    if (loading) {
      return <Lottie className="loading" animationData={Loading} />;
    }
    return categories.map((category, i) => (
      <Card key={i} category={category} />
    ));
  };

  useEffect(() => {
    dispatch(setCurrentCategory({}));
  }, []);

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
      <div className="categories-container">{renderServices()}</div>
    </Layout>
  );
}
