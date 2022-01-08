import React from "react";

export default function Input({ label, type }) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type === "string" ? "text" : "number"}
        name={label}
        placeholder={label}
      />
    </div>
  );
}