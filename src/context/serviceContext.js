import React from "react";

const defaultValue = {
  wsdl: "",
  name: "",
  id: null,
  currentXML: "",
};

export { defaultValue };

export default React.createContext(defaultValue);
