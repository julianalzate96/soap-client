import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ServiceContext, { defaultValue } from "../context/serviceContext";
import CategoriesContext from "../context/categoriesContext";

import Services from "../pages/services";
import Home from "../pages/home";

import { fetchServicesInfo } from "../api";

export default function App() {
  const [service, setService] = useState(defaultValue);
  const [categories, setCategories] = useState([]);

  const values = useMemo(
    () => ({ service, setService }),
    [service, setService]
  );

  const categoriesValues = useMemo(
    () => ({ categories, setCategories }),
    [categories, setCategories]
  );

  const renderCategoryRoutes = () => {
    return categories.map((category, i) => {
      let path = category.nombre.replace(/\s/g, "-").toLowerCase();
      return (
        <React.Fragment key={i}>
          <Route path={`/${path}`} element={<Services />} />
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    fetchServicesInfo("categories", null).then((res) => {
      setCategories(res);
    });
  }, []);

  return (
    <Router>
      <CategoriesContext.Provider value={categoriesValues}>
        <ServiceContext.Provider value={values}>
          <Routes>
            <Route path="/" element={<Home />} />
            {renderCategoryRoutes()}
          </Routes>
        </ServiceContext.Provider>
      </CategoriesContext.Provider>
    </Router>
  );
}
