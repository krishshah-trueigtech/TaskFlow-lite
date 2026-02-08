import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTaskContext } from "../context/TaskContext";

export const useTaskForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { createTask, updateTask, editingTask, closeModal } = useTaskContext();

  const today = new Date().toLocaleDateString("en-CA");

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

  const onFormSubmit = async (data) => {
    if (editingTask) {
      await updateTask({
        ...editingTask,
        ...data,
      });
    } else {
      await createTask({
        ...data,
        status: "to-do",
        id: uuidv4(),
      });
    }
    closeModal();
  };

  return {
    register,
    control,
    handleSubmit: handleSubmit(onFormSubmit),
    errors,
    today,
    editingTask,
  };
};
