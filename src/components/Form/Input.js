import React from "react";

export default function Input({ label, type }) {
  return (
    <div className="input-container">
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type === "email" ? type : type === "string" ? "text" : "number"}
        name={label}
        placeholder={label}
        required
      />
    </div>
  );
}
