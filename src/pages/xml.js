import React, { useState, useEffect } from "react";
import XMLViewer from "react-xml-viewer";

const customTheme = {
  overflowBreak: true,
  tagColor: "#2815B2",
};

export default function Xml() {
  const [currentXML, setCurrentXML] = useState("");

  useEffect(() => {
    setCurrentXML(localStorage.getItem("currentXML"));
  }, []);

  if (!currentXML) {
    return <span>No hay un XML para renderizar</span>;
  }

  return (
    <XMLViewer
      xml={currentXML}
      theme={customTheme}
      collapsible
      indentSize={1}
    />
  );
}
