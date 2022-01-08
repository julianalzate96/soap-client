import React from "react";

const defaultValue = {
  wsdl: "",
  name: "",
  id: null,
};

export { defaultValue };

export default React.createContext(defaultValue);
