import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import SkeletonCard from "../../../common/components/SkeletonCard";

const TaskColumn = ({ title, tasks = [], status, isLoading }) => {
  return (
    <div className="flex-1 bg-gray-100 dark:bg-[#200b33] rounded-lg p-2.5 min-w-[300px]">
      <h3 className="mt-0 text-center text-gray-800 dark:text-white border-b-2 border-gray-300 dark:border-gray-700 pb-2.5 mb-4 font-bold">
        {title} ({isLoading ? "..." : tasks.length})
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
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                {tasks.length === 0 && !snapshot.isDraggingOver && (
                  <p className="text-center text-gray-500 py-4">No tasks</p>
                )}
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                        className="mb-2.5"
                      >
                        <TaskCard {...task} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
