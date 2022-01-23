import React, { useEffect } from "react";
import { Routes, Route, Redirect, useLocation } from "react-router-dom";

import Services from "../pages/services";
import Home from "../pages/home";
import Xml from "../pages/xml";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../redux/actions/categories.actions";
import { transformTitleToPath } from "../utils";

export default function App() {
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const location = useLocation();

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
    if (categories.data.length === 0) {
      if (location.pathname === "/") {
        dispatch(fetchCategoriesAction());
      } else {
        window.location.replace("/");
      }
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
