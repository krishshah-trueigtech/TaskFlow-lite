import useTaskCard from "../hooks/useTaskCard";
import editIcon from "../../../assets/editIcon.webp";
import deleteIcon from "../../../assets/deleteIcon.webp";

import { memo } from "react";

const TaskCard = (props) => {
  const {
    id,
    priority,
    title,
    dueDate,
    assignee,
    onToggle,
    isSelected,
    multiSelectionCount,
  } = props;
  const { getPriorityColor, handleDelete, openEditModal } = useTaskCard(props);
  return (
    <div className="flex  items-center gap-2 relative">
      {multiSelectionCount > 1 && (
        <div className="absolute-top-3 -right-2 z-50 bg-red-600 text-white text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full shadow-md border-2 border-white">
          {multiSelectionCount}
        </div>
      )}

      <div className="!bg-taskCard  p-4 rounded-lg flex-grow shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg text-left ]">
        <div className="flex justify-between items-start mb-2 w-full">
          <span
            className="font-bold text-xs uppercase"
            style={{ color: getPriorityColor(priority) }}
          >
            {priority}
          </span>
          <input
            type="checkbox"
            checked={!!isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onToggle(id);
            }}
          />
        </div>

        <h3 className="my-1.5 font-bold text-lg text-black">{title}</h3>
        <div className="text-gray-600 text-sm">
          <p>{dueDate}</p>
          <p className="italic">{assignee || "Unassigned"}</p>
        </div>
        <div className="flex justify-end gap-1">
          <button
            onClick={() => openEditModal(props)}
            className="!bg-functionalButton !border-none p-1 hover:bg-gray-100 rounded"
          >
            <img src={editIcon} className="h-full " />
          </button>
          <button
            onClick={handleDelete}
            className="!bg-functionalButton  !border-none text-gray-900 text-xl hover:text-red-500 "
          >
            <img src={deleteIcon} className="h-full " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskCard);
