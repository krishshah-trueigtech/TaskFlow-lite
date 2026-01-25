import { useForm } from "react-hook-form";
import { useTasks } from "../../hooks/useTasks.js";
const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const today = new Date().toISOString().split("T")[0];
  const { createTask } = useTasks();

  const onSubmit = async (data) => {
    await createTask(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="title">
        <label>Title</label>
        <input {...register("title", { required: "Please Enter a title" })} />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </div>
      <div className="priority">
        <label>Priority: </label>
        <label>
          <input
            type="radio"
            value="High"
            {...register("priority", { required: "Please select a priority" })}
          />
          High
        </label>
        <label>
          <input
            type="radio"
            value="Medium"
            {...register("priority", { required: "Please select a priority" })}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            value="Low"
            {...register("priority", { required: "Please select a priority" })}
          />
          Low
        </label>
        {!errors.title && errors.priority && (
          <span className="error">{errors.priority.message}</span>
        )}
      </div>
      <div className="dueDate">
        <label>Due Date</label>
        <input
          type="date"
          {...register("dueDate", {
            required: "Due date is required",
            validate: (value) =>
              value >= today || "Due date cannot be in the past",
          })}
        />
        {!errors.priority && errors.dueDate && (
          <span className="error">{errors.dueDate.message}</span>
        )}
      </div>
      <div className="assignee">
        <label>Assignee</label>
        <input
          {...register("assignee", { required: "Please select an assignee" })}
        />
        {!errors.dueDate && errors.assignee && (
          <span className="error">{errors.assignee.message}</span>
        )}
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
