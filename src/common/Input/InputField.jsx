import ReactDatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

export default function InputField({
  control,
  name,
  label,
  placeholder,
  rules,
  type,
}) {
  return (
    <div>
      <label htmlFor={name}> {label} </label>
      <Controller
        control={control}
        name={name}
        placeholder={placeholder}
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
          />
        )}
      />
    </div>
  );
}
