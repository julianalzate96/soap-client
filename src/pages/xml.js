import React, { useContext } from "react";
import XMLViewer from "react-xml-viewer";
import ServiceContext from "../context/serviceContext";

const customTheme = {
  overflowBreak: true,
  tagColor: "#2815B2",
};

export default function Xml() {
  const { service } = useContext(ServiceContext);
  return (
    <XMLViewer
      xml={service.currentXML}
      theme={customTheme}
      collapsible
      indentSize={1}
    />
  );
}
