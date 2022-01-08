import React from "react";

export default function Input({ label, type }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type === "string" ? "text" : "number"} placeholder={label} />
    </div>
  );
}
