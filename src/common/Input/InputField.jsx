import React from "react";
import { Controller } from "react-hook-form";

export default function InputField({
  control,
  name,
  label,
  placeholder,
  rules,
  type,
  options,
}) {
  if (type === "radio") {
    return (
      <fieldset>
        <legend>{label}</legend>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field }) => (
            <div className="form-radio">
              {options.map((optionValue) => (
                <label key={optionValue}>
                  <input
                    type="radio"
                    onChange={field.onChange}
                    checked={field.value === optionValue}
                    value={optionValue}
                    className="form-radio"
                  />
                  {optionValue}
                </label>
              ))}
            </div>
          )}
        />
      </fieldset>
    );
  }

  if (type === "checkbox") {
    return (
      <div className="form-checkbox">
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value, ref } }) => (
            <input
              type="checkbox"
              id={name}
              ref={ref}
              onChange={(e) => onChange(e.target.checked)}
              checked={!!value}
              className="form-checkbox"
            />
          )}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  }
  if (type === "select") {
    return (
      <div className="form-select">
        <label htmlFor={name}>{label}</label>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field }) => (
            <select {...field} id={name} className="form-input">
              <option value="">{placeholder || "Select option"}</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        />
      </div>
    );
  }
  return (
    <>
      <label htmlFor={name}> {label} </label>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <input
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value || ""}
            type={type}
            name={name}
            id={name}
            className="form-input"
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
}
