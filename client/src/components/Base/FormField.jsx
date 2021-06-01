import React from "react";
import "../../styles/FormField.css";

const FormField = (props) => {
  const { error, errorText, value, onChange, type, name, label, placeholder } =
    props;

  return (
    <div className="FormField">
      <label className="FormField__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="FormField__input"
        name={name}
        type={type || "text"}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder || ""}
      />
      {error && <div className="FormField__feedback--error">{errorText}</div>}
    </div>
  );
};

export default FormField;
