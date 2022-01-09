import React, { useRef, useEffect } from "react";

function useClickHandler(ref, action) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (action) {
          action();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, action]);
}

function ClickHandler(props) {
  const wrapperRef = useRef(null);
  useClickHandler(wrapperRef, props.action);

  return (
    <div className="click-handler" ref={wrapperRef}>
      {props.children}
    </div>
  );
}

export default ClickHandler;
