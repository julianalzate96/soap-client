import React, { useState, useEffect } from "react";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import ReactDOM from "react-dom";

import "../../styles/_modal.scss";

function Layout({ children }) {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    let element = document.getElementsByTagName("body");
    disableBodyScroll(element);
    setModalRoot(document.getElementById("modal-root"));

    return () => {
      clearAllBodyScrollLocks();
    };
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
