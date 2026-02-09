import React from "react";
import InputField from "../fields/components/InputField";
import SelectField from "../fields/components/SelectField";
import RadioField from "../fields/components/RadioField";
import CheckboxField from "../fields/components/CheckboxField";

const FormGenerator = ({ formFields, control, errors }) => {
  return (
    <>
      {formFields.map((field) => {
        const commonProps = {
          name: field.name,
          label: field.label,
          control: control,
          rules: field.rules,
          placeholder: field.placeholder,
          autoComplete: field.autoComplete,
        };

        const errorMessage = errors[field.name]?.message;

        return (
          <div key={field.name} className="flex flex-col gap-1 w-full">
            {(() => {
              switch (field.type) {
                case "select":
                  return (
                    <SelectField {...commonProps} options={field.options} />
                  );
                case "radio":
                  return (
                    <RadioField {...commonProps} options={field.options} />
                  );
                case "checkbox":
                  return <CheckboxField {...commonProps} />;
                default:
                  return <InputField {...commonProps} type={field.type} />;
              }
            })()}
            {errorMessage && (
              <span className="text-red-500 text-xs mt-1 ml-1">
                {errorMessage}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
};

export default FormGenerator;
