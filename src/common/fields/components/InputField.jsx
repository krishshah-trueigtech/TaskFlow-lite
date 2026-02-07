import React from "react";
import { Controller } from "react-hook-form";

export default function InputField({
  control,
  name,
  label,
  placeholder,
  rules,
  type,
  autoComplete,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            id={name}
            className="form-input"
            placeholder={placeholder}
            autoComplete={autoComplete || "off"}
            value={field.value || ""}
          />
        )}
      />
    </div>
  );
}
