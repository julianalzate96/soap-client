import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "../../styles/_modal.scss";

function Layout({ children }) {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    setModalRoot(document.getElementById("modal-root"));
  }, []);

  if (!modalRoot) {
    return <div />;
  }

  return ReactDOM.createPortal(
    <div className="wrapper">{children}</div>,
    modalRoot
  );
}

export default Layout;
