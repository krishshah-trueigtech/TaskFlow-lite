import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "./TaskColumn";
import useBoardTasks from "../hooks/useBoardTasks";
import columns from "../constants/columns";
import { useTaskContext } from "../context/TaskContext";
import { useBoardPreference} from "../hooks/useBoardPreference";

const TaskBoard = ({ tasks, loading, error }) => {
  const { onDragEnd } = useTaskContext();
  const { columnTasks } = useBoardTasks(tasks);
  const { collapsedCol, toggleColumn } = useBoardPreference();

  if (error)
    return (
      <p className="text-red-500 p-5 text-center font-bold">Error: {error}</p>
    );
  return (
    <DragDropContext onDragEnd={onDragEnd}>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full items-start">
        {columns.map((col) => (
          <TaskColumn
            key={col.status}
            title={col.title}
            status={col.status}
            tasks={columnTasks[col.status]}
            isLoading={loading}
            isCollapsed={!!collapsedCol[col.status]}
            onToggle={()=> toggleColumn(col.status)}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
