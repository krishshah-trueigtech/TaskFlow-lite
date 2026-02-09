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
      className={`flex-1 bg-surface-light dark:bg-columnColor rounded-[1.25rem] p-3 transition-all duration-300 max-w-sm w-full`}
    >
      <div
        className="flex items-center justify-center text-center border-border-light dark:border-border-dark pb-2.5 mb-4 cursor-pointer"
        onClick={onToggle}
      >
        {!isCollapsed && (
          <h3 className="font-bold text-text-dark dark:text-white">
            {isLoading[status] ? "..." : null}
          </h3>
        )}
        <div className="w-full">
          <button className="toggle-btn-custom text-white w-full">
            {title}
          </button>
        </div>
      </div>

      {!isCollapsed ? (
        <Droppable droppableId={status}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex flex-col gap-2.5 min-h-[12rem] max-h-[29rem] overflow-y-auto p-1 ${
                snapshot.isDraggingOver
                  ? "bg-drag-overlay-light dark:bg-drag-overlay-dark"
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
