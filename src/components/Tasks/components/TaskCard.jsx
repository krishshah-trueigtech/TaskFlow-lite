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
    <div className="flex items-center gap-2 relative">
      {multiSelectionCount > 1 && (
        <div className="absolute -top-3 -right-2 z-50 bg-badge-bg text-white text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full shadow-md border-2 border-badge-border">
          {multiSelectionCount}
        </div>
      )}

      <div className="task-card-custom p-4 rounded-lg flex-grow shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg text-left">
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
            className="cursor-pointer"
          />
        </div>

        <h3 className="my-1.5 font-bold text-lg text-white">{title}</h3>
        <div className="text-white text-sm">
          <p>{dueDate}</p>
          <p className="italic">{assignee || "Unassigned"}</p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => openEditModal(props)}
            className="!bg-functionalButton !border-none  hover:bg-icon-edit-bg-hover"
          >
            <img src={editIcon} className="object-cover" alt="Edit" />
          </button>
          <button
            onClick={handleDelete}
            className="!bg-functionalButton !border-none text-icon-delete  hover:text-icon-delete-hover"
          >
            <img src={deleteIcon} className="object-cover" alt="Delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(TaskCard);
