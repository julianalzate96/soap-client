import React from "react";

import Input from "./Input";

import "../../styles/_form.scss";

function Form({ children, onSubmit }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      {children}
      <button type="submit">PROBAR</button>
    </form>
  );
}

Form.Input = Input;

export default Form;
