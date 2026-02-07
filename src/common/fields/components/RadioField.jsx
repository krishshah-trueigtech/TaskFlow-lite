import { Controller } from "react-hook-form";

const RadioField = ({ control, name, label, rules, options }) => {
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
};

export default RadioField;
