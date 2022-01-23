import React, { useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import Services from "../pages/services";
import Home from "../pages/home";
import Xml from "../pages/xml";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../redux/actions/category.actions";
import { transformTitleToPath } from "../utils";

export default function App() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const renderCategoryRoutes = () => {
    return categories.data.map((category, i) => {
      return (
        <Route
          key={i}
          path={`/${transformTitleToPath(category.nombre)}`}
          element={<Services />}
        />
      );
    });
  };

  useEffect(() => {
    if (window.location.pathname === "/" && categories.data.length === 0) {
      dispatch(fetchCategoriesAction());
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {renderCategoryRoutes()}
      <Route path="/xml" element={<Xml />} />
    </Routes>
  );
}
