import React from "react";
import fields from "../fields/index";

const FormGenerator = ({ formFields, control, errors }) => {
  return (
    <>
      {formFields.map((field) => {
        const fieldType = ["select", "radio", "checkbox"].includes(field?.type)
          ? field?.type
          : "input";

        const Component = fields[fieldType];

        if (!Component) {
          console.error(`No component found for type: ${fieldType}`);
          return null;
        }

        return (
          <div className="form-input-fields" key={field.name}>
            <Component control={control} {...field} />

            {errors[field.name] && (
              <span className="validation-errors">
                {errors[field.name]?.message?.toString()}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
};

export default FormGenerator;
