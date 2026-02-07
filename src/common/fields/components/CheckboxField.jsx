import { Controller } from "react-hook-form";

const CheckboxField = ({ control, name, label, rules }) => {
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
};

export default CheckboxField;
