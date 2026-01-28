import { useMemo } from "react";

export const useTaskFilter = (tasks, searchTerm, priorityFilter) => {
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task?.title
        ?.toLowerCase()

        .includes(searchTerm?.toLowerCase());

      const matchesPriority =
        priorityFilter === "All" || task.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchTerm, priorityFilter]);

  return filteredTasks;
};
