import { useMemo } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import { useTaskContext } from "../context/TaskContext";
import columns from "../constants/columns";

const TaskBoard = ({ tasks, loading, error }) => {
  const { updateTask } = useTaskContext();

  const columnTasks = useMemo(() => {
    const safeTasks = tasks || [];
    return {
      "to-do": safeTasks.filter((t) => t.status === "to-do"),
      "in-progress": safeTasks.filter((t) => t.status === "in-progress"),
      done: safeTasks.filter((t) => t.status === "done"),
    };
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;
    updateTask({ id: draggableId, status: destination.droppableId });
  };

  if (error)
    return (
      <p className="text-red-500 p-5 text-center font-bold">Error: {error}</p>
    );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-5 p-5 justify-between items-start overflow-x-auto w-full">
        {columns.map((col) => (
          <TaskColumn
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={columnTasks[col.status]}
            isLoading={loading}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
