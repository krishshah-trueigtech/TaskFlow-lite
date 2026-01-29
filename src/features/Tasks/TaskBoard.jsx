import { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "../../components/TaskCard";
import "./TaskBoard.css";

const TaskBoard = ({ tasks, loading, error }) => {
  const columnTasks = useMemo(() => {
    const safeTasks = tasks || [];
    return {
      "to-do": safeTasks.filter((task) => task.status === "to-do"),
      "in-progress": safeTasks.filter((task) => task.status === "in-progress"),
      done: safeTasks.filter((task) => task.status === "done"),
    };
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (destination.droppableId !== source.droppableId) {
      updateTask({ id: draggableId, status: destination.droppableId });
    }
  };

  if (error) return <p className="error">Error: {error}</p>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        <TaskColumn
          title="To Do"
          tasks={columnTasks["to-do"]}
          status="to-do"
          isLoading={loading}
        />
        <TaskColumn
          title="In Progress"
          tasks={columnTasks["in-progress"]}
          status="in-progress"
          isLoading={loading}
        />
        <TaskColumn
          title="Done"
          tasks={columnTasks["done"]}
          status="done"
          isLoading={loading}
        />
      </div>
    </DragDropContext>
  );
};

const SkeletonCard = () => {
  return (
    <div className="task-card skeleton-card">
      <div className="skeleton-pulse skeleton-header"></div>
      <div className="skeleton-pulse skeleton-title"></div>
      <div>
        <div className="skeleton-pulse skeleton-text"></div>
        <div className="skeleton-pulse skeleton-text"></div>
      </div>
      <div className="skeleton-pulse skeleton-actions"></div>
    </div>
  );
};

const TaskColumn = ({ title, tasks = [], status, isLoading }) => {
  return (
    <div className="column">
      <h3>
        {title} ({isLoading ? "..." : tasks.length})
      </h3>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            className="column-content"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isHvoringOver
                ? "#eae6ff"
                : "transparent",
              transition: "background-color 0.2s ease",
              flexGrow: 1,
            }}
          >
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : (
              <>
                {tasks?.length === 0 && !snapshot?.isDraggingOver && (
                  <p className="empty-msg">No tasks</p>
                )}

                {tasks?.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          marginBottom: "10px",
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
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

export default TaskBoard;
