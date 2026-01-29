import "./TaskCard.css";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { openModal } from '../features/Tasks/taskSlice';
const TaskCard = (props) => {
  const dispatch = useDispatch();
  const {
    id = "-",
    title = "n/a",
    priority = "Low",
    dueDate = "-",
    assignee = "Unassigned",
  } = props;

  const getPriorityColor = (p) => {
    if (p === "High") return "red";
    if (p === "Medium") return "orange";
    return "green";
  };

  const handleStatusChange = async (newStatus) => {
    updateTask({ id, title, priority, dueDate, assignee, status: newStatus });
  };


  return (
    <div
      className="task-card"
      style={{ borderLeft: `5px solid ${getPriorityColor(priority)}` }}
    >
      <div className="card-header">
        <span
          className="priority-tag"
          style={{ color: getPriorityColor(priority) }}
        >
          {priority}
        </span>
        <div className="header-actions">
          <button
            onClick={handleEdit}
            className="edit-btn"
            style={{
              marginRight: "5px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="delete-btn"
            title="Delete Task"
          >
            &times;
          </button>
        </div>
      </div>

      <h3>{title}</h3>
      <div className="card-details">
        <p>
          <small>{dueDate}</small>
        </p>
        <p>
          <small>{assignee || "Unassigned"}</small>
        </p>
      </div>

      <div className="card-actions">
        {status === "to-do" && (
          <button
            onClick={() => handleStatusChange("in-progress")}
            className="btn-start"
          >
            Start
          </button>
        )}
        {status === "in-progress" && (
          <>
            <button
              onClick={() => handleStatusChange("to-do")}
              className="btn-secondary"
            >
              ← Back
            </button>
            <button
              onClick={() => handleStatusChange("done")}
              className="btn-done"
            >
              Done
            </button>
          </>
        )}
        {status === "done" && (
          <button
            onClick={() => handleStatusChange("in-progress")}
            className="btn-secondary"
          >
            Reopen
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(TaskCard);
