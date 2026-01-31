import { useTaskForm } from "../hooks/useTaskForm";
import { getTaskFormFields } from "../constants/taskFormFields";
import InputField from "../../../../../common/Input/InputField";

const TaskForm = () => {
  const { register, control, handleSubmit, errors, today, editingTask } =
    useTaskForm();

  const formFields = getTaskFormFields(today);

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (
        <div key={field.name}>
          <InputField
            control={control}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            rules={field.rules}
          />

          {errors[field.name] && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              {errors[field.name]?.message?.toString()}
            </span>
          )}
        </div>
      ))}

      <fieldset className="priority" style={{ border: "none", padding: 0 }}>
        <legend style={{ fontWeight: "bold" }}>Priority:</legend>
        {["High", "Medium", "Low"].map((p) => (
          <label key={p}>
            <input
              type="radio"
              value={p}
              {...register("priority", {
                required: "Please select a priority",
              })}
            />
            {p}
          </label>
        ))}
        {errors.priority && (
          <span className="error" style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.priority.message}
          </span>
        )}
      </fieldset>

      <button type="submit" className="submit-btn">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
