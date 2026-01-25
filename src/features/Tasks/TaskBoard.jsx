import { useEffect, useMemo } from "react";
import { useTasks } from "../../hooks/useTasks";
import TaskCard from "../../components/TaskCard";
import "./TaskBoard.css";

const TaskBoard = () => {
  const { tasks, fetchTasks, loading, error } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

  const columnTasks = useMemo(() => {
    return {
      todo: tasks.filter((task) => task.status === "to-do"),
      inProgress: tasks.filter((task) => task.status === "in-progress"),
      done: tasks.filter((task) => task.status === "done"),
    };
  }, [tasks]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="board">
      <TaskColumn title="To Do" tasks={columnTasks.todo} status="to-do" />
      <TaskColumn
        title="In Progress"
        tasks={columnTasks.inProgress}
        status="in-progress"
      />
      <TaskColumn title="Done" tasks={columnTasks.done} status="done" />
    </div>
  );
};

const TaskColumn = ({ title, tasks }) => {
  return (
    <div className="column">
      <h3>
        {title} ({tasks.length})
      </h3>
      <div className="column-content">
        {tasks.length === 0 ? (
          <p className="empty-msg">No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} {...task} />)
        )}
      </div>
    </div>
  );
};

export default TaskBoard;
