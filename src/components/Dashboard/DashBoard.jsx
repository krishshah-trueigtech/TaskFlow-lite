import { useState } from "react";
import { TaskProvider, useTaskContext } from "../Tasks/context/TaskContext.jsx";
import TaskBoard from "../Tasks/components/TaskBoard.jsx";
import TaskForm from "../Tasks/components/TaskForm.jsx";
import { useTaskFilter } from "../Tasks/hooks/useTaskFilter.js";
import { useDebounce } from "../../common/hooks/useDebounce.js";
import Modal from "../../common/Modal/components/Modal.jsx";
import BulkActionBar from "../Tasks/components/BulkActionBar";
import { OnlineStatus } from "../../common/hooks/useOnlineStatus";

const DashboardContent = () => {
  const {
    tasks,
    loading,
    error,
    handleRetry,
    openCreateModal,
    selectedTaskIds,
    fetchTasks,
  } = useTaskContext();
  const isOnline = OnlineStatus();
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const debouncedSearch = useDebounce(searchTerm, 300);
  const filteredTasks = useTaskFilter(tasks, debouncedSearch, priorityFilter);

  return (
    <div className="dashboard-container">
      {!isOnline && (
        <div className="bg-red-500 text-white p-2 text-center">
          You are offline. Some features may be unavailable.
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center p-4 bg-red-100 border-l-4 border-red-500 my-2">
          <p className="text-red-700 font-medium">{error}</p>
          <div className="flex gap-2">
            <button
              onClick={handleRetry}
              className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
            >
              Retry Last Action
            </button>
            <button
              onClick={fetchTasks}
              className="mt-2 bg-gray-500 text-white px-4 py-1 rounded"
            >
              Refresh List
            </button>
          </div>
        </div>
      )}
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
      {selectedTaskIds.length > 0 && <BulkActionBar />}
      <TaskBoard tasks={filteredTasks} loading={loading} error={error} />
    </div>
  );
};

export const Dashboard = () => {
  return <DashboardContent />;
};
