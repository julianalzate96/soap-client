import React from "react";

import Input from "./Input";

function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <button type="submit">PROBAR</button>
    </form>
  );
}

Form.Input = Input;

export default Form;
