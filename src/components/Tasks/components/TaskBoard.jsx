import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import useBoardTasks from "../hooks/useBoardTasks";
import columns from "../constants/columns";
import { useTaskContext } from "../context/TaskContext";

const TaskBoard = ({ tasks, loading, error }) => {
  const { onDragEnd } = useTaskContext();
  const { columnTasks } = useBoardTasks(tasks);
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
