import { useTaskForm } from "../hooks/useTaskForm";
import { getTaskFormFields } from "../constants/taskFormFields";
import FormGenerator from "../../../../../common/components/FormGenerator";

const TaskForm = () => {
  const { control, handleSubmit, errors, today, editingTask } = useTaskForm();
  const formFields = getTaskFormFields(today);

  return (
    <form onSubmit={handleSubmit} className="form">
      <FormGenerator
        formFields={formFields}
        control={control}
        errors={errors}
      />

      <button type="submit" className="submit-btn mt-4">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
