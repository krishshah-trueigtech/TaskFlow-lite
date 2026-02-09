import { useTaskForm } from "../hooks/useTaskForm";
import getTaskFormFields from "../constants/taskFormFields";
import FormGenerator from "../../../common/components/FormGenerator";

const TaskForm = () => {
  const { control, handleSubmit, errors, today, editingTask } = useTaskForm();
  const formFields = getTaskFormFields(today);

  return (
    <div className="w-full min-w-sm mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        {editingTask ? "Edit Task" : "Create New Task"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-4">
          <FormGenerator
            formFields={formFields}
            control={control}
            errors={errors}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-3 font-semibold text-lg shadow-md hover:shadow-lg transition-all"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
