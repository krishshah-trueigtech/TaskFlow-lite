import useTaskCard from "../hooks/useTaskCard";
import { memo } from "react";
const TaskCard = (props) => {
  const { status, priority, title, dueDate, assignee } = props;
  const { getPriorityColor, handleStatusChange, handleDelete, openEditModal } =
    useTaskCard(props);

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg text-left border-l-[5px]"
      style={{ borderLeftColor: getPriorityColor(priority) }}
    >
      <div className="flex justify-between items-start mb-2 w-full">
        <span
          className="font-bold text-xs uppercase"
          style={{ color: getPriorityColor(priority) }}
        >
          {priority}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => openEditModal(props)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-400 text-xl hover:text-red-500 transition-colors"
          >
            &times;
          </button>
        </div>
      </div>

      <h3 className="my-1.5 font-bold text-lg text-black">{title}</h3>
      <div className="text-gray-600 text-sm">
        <p>{dueDate}</p>
        <p className="italic">{assignee || "Unassigned"}</p>
      </div>

      <div className="mt-4 flex gap-2">
        {status === "to-do" && (
          <button
            onClick={() => handleStatusChange("in-progress")}
            className="flex-1 p-2 rounded  text-white"
          >
            Start
          </button>
        )}
        {status === "in-progress" && (
          <>
            <button
              onClick={() => handleStatusChange("to-do")}
              className="flex-1 p-2 rounded   text-white"
            >
              ← Back
            </button>
            <button
              onClick={() => handleStatusChange("done")}
              className="flex-1 p-2 rounded  text-white "
            >
              Done
            </button>
          </>
        )}
        {status === "done" && (
          <button
            onClick={() => handleStatusChange("in-progress")}
            className="flex-1 p-2 rounded  text-white"
          >
            Reopen
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(TaskCard);
