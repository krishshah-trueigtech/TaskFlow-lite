import { useMemo } from "react";
import TaskCard from "../../components/TaskCard";
import "./TaskBoard.css";

const TaskBoard = ({ tasks, loading, error }) => {
  const columnTasks = useMemo(() => {
    const safeTasks = tasks || [];
    return {
      todo: safeTasks.filter((task) => task.status === "to-do"),
      inProgress: safeTasks.filter((task) => task.status === "in-progress"),
      done: safeTasks.filter((task) => task.status === "done"),
    };
  }, [tasks]);

  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="board">
      <TaskColumn
        title="To Do"
        tasks={columnTasks.todo}
        status="to-do"
        isLoading={loading}
      />
      <TaskColumn
        title="In Progress"
        tasks={columnTasks.inProgress}
        status="in-progress"
        isLoading={loading}
      />
      <TaskColumn
        title="Done"
        tasks={columnTasks.done}
        status="done"
        isLoading={loading}
      />
    </div>
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

const TaskColumn = ({ title, tasks, isLoading }) => {
  return (
    <div className="column">
      <h3>
        {title} ({isLoading ? "..." : tasks.length})
      </h3>
      <div className="column-content">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : tasks.length === 0 ? (
          <p className="empty-msg">No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} {...task} />)
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
