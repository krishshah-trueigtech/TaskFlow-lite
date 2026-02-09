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
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  opacity: snapshot.isDragging
                    ? 1
                    : isSelected && isDraggingOver
                      ? 0.4
                      : 1,
                }}
                className="mb-2.5"
              >
                <TaskCard
                  {...task}
                  isSelected={isSelected}
                  onToggle={toggleTaskSelection}
                />
              </div>
            )}
          </Draggable>
        );
      })}
    </>
  );
};

export default TaskList;
