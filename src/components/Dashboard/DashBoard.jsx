import { useState } from "react";
import { TaskProvider, useTaskContext } from "../Tasks/context/TaskContext.jsx";
import TaskBoard from "../Tasks/components/TaskBoard/TaskBoard.jsx";
import TaskForm from "../Tasks/components/TaskForm/components/TaskForm.jsx";
import { useTaskFilter } from "../Tasks/hooks/useTaskFilter.js";
import { useDebounce } from "../../common/hooks/useDebounce.js";
import Modal from "../../common/Modal/components/Modal.jsx";
import { useModal } from "../../common/Modal/context/ModalContext.jsx"; //

const DashboardContent = () => {
  const { tasks, loading, error } = useTaskContext();
  const { openModal } = useModal();
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
          style={{ padding: "8px" }}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button onClick={() => openModal("taskForm")}> New Task</button>
      </div>

      <TaskBoard tasks={filteredTasks} loading={loading} error={error} />
    </div>
  );
};

export const Dashboard = () => {
  return (
    <TaskProvider>
      <DashboardContent />
    </TaskProvider>
  );
};
