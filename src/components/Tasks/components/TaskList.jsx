import { Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import SkeletonCard from "../../../common/components/SkeletonCard";

const TaskList = ({ tasks, isLoading, isDraggingOver }) => {
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
    </>
  );
};

export default TaskList;
