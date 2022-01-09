import React from "react";

const defaultValue = {
  wsdl: "",
  name: "",
  id: null,
  description: "",
  currentXML: "",
};

export { defaultValue };

export default React.createContext(defaultValue);
