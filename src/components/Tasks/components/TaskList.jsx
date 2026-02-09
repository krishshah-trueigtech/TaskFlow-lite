import { Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import SkeletonCard from "../../../common/components/SkeletonCard";
import { useTaskContext } from "../context/TaskContext";

const TaskList = ({ tasks, isLoading, isDraggingOver }) => {
  const { selectedTaskIds, toggleTaskSelection } = useTaskContext();

  if (isLoading) {
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  if (tasks.length === 0 && !isDraggingOver) {
    return <p className="text-center text-gray-500 py-4">No tasks</p>;
  }

  return (
    <>
      {tasks.map((task, index) => {
        const isSelected = selectedTaskIds?.includes(task.id);

        return (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => {
              const isLeader =
                snapshot.isDragging && isSelected && selectedTaskIds.length > 1;

              const opacity = snapshot.isDragging
                ? 1
                : isSelected && isDraggingOver
                  ? 0.5
                  : 1;

              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    opacity: opacity,
                    transform:
                      !snapshot.isDragging && isSelected && isDraggingOver
                        ? "scale(0.95)"
                        : provided.draggableProps.style?.transform,
                  }}
                  className="mb-2.5"
                >
                  <TaskCard
                    {...task}
                    isSelected={isSelected}
                    onToggle={toggleTaskSelection}
                    multiSelectionCount={isLeader ? selectedTaskIds.length : 0}
                  />
                </div>
              );
            }}
          </Draggable>
        );
      })}
    </>
  );
};

export default TaskList;
