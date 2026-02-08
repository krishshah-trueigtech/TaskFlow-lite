import { useState } from "react";
import { TaskProvider, useTaskContext } from "../Tasks/context/TaskContext.jsx";
import TaskBoard from "../Tasks/components/TaskBoard.jsx";
import TaskForm from "../Tasks/components/TaskForm.jsx";
import { useTaskFilter } from "../Tasks/hooks/useTaskFilter.js";
import { useDebounce } from "../../common/hooks/useDebounce.js";
import Modal from "../../common/Modal/components/Modal.jsx";

const DashboardContent = () => {
  const { tasks, loading, error, openCreateModal } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const debouncedSearch = useDebounce(searchTerm, 300);
  const filteredTasks = useTaskFilter(tasks, debouncedSearch, priorityFilter);

  return (
    <div className="dashboard-container">
      <div className="flex p-4 gap-2 items-center ">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="form-input p-4 max-w-fit"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={openCreateModal}> New Task</button>
      </div>

      <TaskBoard tasks={filteredTasks} loading={loading} error={error} />
    </div>
  );
};

export const Dashboard = () => {
  return <DashboardContent />;
};
