import React from "react";
import { Controller } from "react-hook-form";

const SelectField = ({
  control,
  name,
  label,
  placeholder,
  rules,
  options,
  className,
  autoComplete,
}) => {
  return (
    <div className="form-select-container">
      <label htmlFor={name} className="mb-1 text-sm">
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <select
            {...field}
            id={name}
            className={`form-input ${className || ""}`}
            autoComplete={autoComplete || "off"}
          >
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};

export default SelectField;
