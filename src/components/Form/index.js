import React from "react";

import Input from "./Input";

function Form({ children, onSubmit }) {
  return <form onSubmit={onSubmit}>{children}</form>;
}

Form.Input = Input;

export default Form;
