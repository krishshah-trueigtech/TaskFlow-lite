import { Droppable } from "@hello-pangea/dnd";
import TaskList from "./TaskList";

const TaskColumn = ({ title, tasks = [], status, isLoading }) => {
  return (
    <div className="flex-1 bg-gray-100 dark:bg-[#200b33] rounded-lg p-2.5 min-w-[300px]">
      <h3 className="mt-0 text-center text-gray-800 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 pb-2.5 mb-4 font-bold">
        {title} ({isLoading[status] ? "..." : tasks.length})
      </h3>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2.5 min-h-[200px] transition-colors duration-200 ${
              snapshot.isDraggingOver
                ? "bg-indigo-50 dark:bg-indigo-900/20"
                : "bg-transparent"
            }`}
          >
            <TaskList
              tasks={tasks}
              isLoading={isLoading[status]}
              isDraggingOver={snapshot.isDraggingOver}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
