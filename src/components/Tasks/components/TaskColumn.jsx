import { Droppable } from "@hello-pangea/dnd";
import TaskList from "./TaskList";

const TaskColumn = ({
  title,
  tasks = [],
  status,
  isLoading,
  isCollapsed,
  onToggle,
}) => {
  return (
    <div
      className={`flex-1 bg-gray-100 dark:bg-columnColor rounded-lg p-3 transition-all duration-300 max-w-sm w-full 
        `}
    >
      <div
        className="flex items-center justify-center text-center  border-gray-300 dark:border-gray-700 pb-2.5 mb-4 cursor-pointer"
        onClick={onToggle}
      >
        {!isCollapsed && (
          <h3 className="font-bold text-gray-800 dark:text-white">
            {isLoading[status] ? "..." : null}
          </h3>
        )}
        <button className="text-gray-500 hover:text-gray-800 dark:text-gray-300">
          {title}
        </button>
      </div>

      {!isCollapsed ? (
        <Droppable droppableId={status}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex flex-col gap-2.5 min-h-[12rem] max-h-[29rem] overflow-y-auto  p-1   ${
                snapshot.isDraggingOver
                  ? "bg-indigo-50 dark:bg-indigo-900/20 "
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
      ) : (
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={onToggle}
        ></div>
      )}
    </div>
  );
};

export default TaskColumn;
