import React from "react";
import Lottie from "lottie-react";

import Input from "./Input";
import Loading from "../../animations/loading-yellow.json";

import "../../styles/_form.scss";

function Form({ children, onSubmit, busy, buttonLabel, buttonTitle }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      {children}
      <div className="button-container">
        {!busy && (
          <button type="submit" disabled={busy} title={buttonTitle}>
            {buttonLabel}
          </button>
        )}
        {busy && <Lottie style={{ width: `100px` }} animationData={Loading} />}
      </div>
    </form>
  );
}

Form.Input = Input;

export default Form;
