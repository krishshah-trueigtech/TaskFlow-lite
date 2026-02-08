import { useMemo } from "react";

const useBoardTasks = (tasks) => {
  const columnTasks = useMemo(() => {
    const safeTasks = tasks || [];
    return {
      "to-do": safeTasks.filter((t) => t.status === "to-do"),
      "in-progress": safeTasks.filter((t) => t.status === "in-progress"),
      done: safeTasks.filter((t) => t.status === "done"),
    };
  }, [tasks]);

  return { columnTasks };
};

export default useBoardTasks;
