import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useTaskContext } from "../../context/TaskContext";

const TaskForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createTask, updateTask, editingTask, closeModal } = useTaskContext();
  const today = new Date().toLocaleDateString('en-CA');

  useEffect(() => {
    if (editingTask) {
      reset(editingTask);
    } else {
      reset({
        title: "",
        priority: "",
        dueDate: "",
        assignee: "",
      });
    }
  }, [editingTask, reset]);

  const onSubmit = async (data) => {
    if (editingTask) {
      await updateTask({
        ...editingTask,
        ...data,
      });
    } else {
      await createTask({
        ...data,
        status: "to-do",
        id: String(Date.now()),
      });
    }
    closeModal();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="title">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register("title", { required: "Please Enter a title" })}
        />
        {errors.title && <span className="error">{errors.title.message}</span>}
      </div>
      <div className="priority">
        <label htmlFor="priority">Priority: </label>
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
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
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
        <label htmlFor="assignee">Assignee</label>
        <input
          id="assignee"
          {...register("assignee", { required: "Please select an assignee" })}
        />
        {!errors.dueDate && errors.assignee && (
          <span className="error">{errors.assignee.message}</span>
        )}
      </div>
      <button type="submit" className="submit-btn">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
