import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import RIGHT_ARROW from "../../images/right-arrow.svg";
import "../../styles/_navbar.scss";

export default function NavBar() {
  const location = useLocation();
  const [history, setHistory] = useState(["/"]);

  useEffect(() => {
    if (location.pathname === "/") {
      setHistory(["/"]);
    } else if (!history.find((route) => route === location.pathname)) {
      setHistory((prev) => [...prev, location.pathname]);
    }
  }, [location]);

  return (
    <nav className="navbar">
      {history.map((route, i) => {
        return (
          <>
            <Link to={route}>
              {route === "/"
                ? "Home"
                : route.replace("/", "").replace(/-|\s/g, " ")}
            </Link>
            {i !== history.length - 1 && (
              <img
                src={RIGHT_ARROW}
                style={{ margin: `0 10px` }}
                height={15}
                width={15}
              />
            )}
          </>
        );
      })}
    </nav>
  );
}
