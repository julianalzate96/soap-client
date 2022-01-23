import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import XMLViewer from "react-xml-viewer";

const customTheme = {
  overflowBreak: true,
  tagColor: "#2815B2",
};

export default function Xml() {
  const { xml } = useSelector((state) => state.services);

  useEffect(() => {
    console.log(xml);
  }, []);

  if (!xml) {
    return <span>No hay un XML para renderizar</span>;
  }

  return <XMLViewer xml={xml} theme={customTheme} collapsible indentSize={1} />;
}
