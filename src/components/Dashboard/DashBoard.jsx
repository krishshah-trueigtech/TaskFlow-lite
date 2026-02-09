import { useState } from "react";
import { useTaskContext } from "../Tasks/context/TaskContext.jsx";
import TaskBoard from "../Tasks/components/TaskBoard.jsx";
import BulkActionBar from "../Tasks/components/BulkActionBar";
import { useTaskFilter } from "../Tasks/hooks/useTaskFilter.js";
import { useDebounce } from "../../common/hooks/useDebounce.js";
import { OnlineStatus } from "../../common/hooks/useOnlineStatus.js";
import ErrorBanner from "../../common/components/ErrorBanner";

export const Dashboard = () => {
  const {
    tasks,
    loading,
    error,
    handleRetry,
    fetchTasks,
    openCreateModal,
    selectedTaskIds,
  } = useTaskContext();

  const isOnline = OnlineStatus();
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredTasks = useTaskFilter(tasks, debouncedSearch, priorityFilter);

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      {!isOnline && (
        <div className="bg-red-500 text-white p-2 text-center text-sm font-bold animate-slide-down">
          You are offline. Some features may be unavailable.
        </div>
      )}

      <ErrorBanner
        message={error}
        onRetry={handleRetry} 
        onClose={() => fetchTasks()}
      />

      <div className="flex flex-col sm:flex-row p-4 gap-4 items-center justify-between bg-surface-light dark:bg-transparent z-10">
        <div className="flex w-full sm:w-auto gap-3 flex-1">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input flex-grow max-sm:max-w-xs"
          />

          <div className="flex  min-w-[120px]">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="form-input cursor-pointer"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <button
          className="w-full sm:w-auto whitespace-nowrap shadow-md hover:shadow-lg"
          onClick={openCreateModal}
        >
          New Task
        </button>
      </div>

      {selectedTaskIds.length > 0 && <BulkActionBar />}

      <TaskBoard
        tasks={filteredTasks}
        loading={loading}
        error={error}
        onRetry={fetchTasks}
      />
    </div>
  );
};

export default Dashboard;