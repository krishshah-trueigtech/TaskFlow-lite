import { useTaskForm } from "../hooks/useTaskForm";
import { getTaskFormFields } from "../constants/taskFormFields";
import InputField from "../../../../../common/Input/InputField";

const TaskForm = () => {
  const { control, handleSubmit, errors, today, editingTask } =
    useTaskForm();

  const formFields = getTaskFormFields(today);

  return (
    <form onSubmit={handleSubmit}
    className="form">
      {formFields.map((field) => (
        <div key={field.name}>
          <InputField
            control={control}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            rules={field.rules}
            options={field.options}
          />

          {errors[field.name] && (
            <span style={{ color: "red", fontSize: "0.8rem" }}>
              {errors[field.name]?.message?.toString()}
            </span>
          )}
        </div>
      ))}

      <button type="submit" className="submit-btn">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
