import "./TaskCard.css";
import useTaskCard from "../hooks/useTaskCard";


const TaskCard = (props) => {
  const { status } = props;
  const { getPriorityColor, handleStatusChange, handleDelete, openEditModal } =
    useTaskCard(props);

  return (
    <div
      className="task-card"
      style={{ borderLeft: `5px solid ${getPriorityColor(props.priority)}` }}
    >
      <div className="card-header">
        <span
          className="priority-tag"
          style={{ color: getPriorityColor(props.priority) }}
        >
          {props.priority}
        </span>
        <div className="header-actions">
          <button
            onClick={() => openEditModal(props)}
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

      <h3>{props.title}</h3>
      <div className="card-details">
        <p>
          <small>{props.dueDate}</small>
        </p>
        <p>
          <small>{props.assignee || "Unassigned"}</small>
        </p>
      </div>

      <div className="card-actions">
        {status === "to-do" && (
          <button
            onClick={() => handleStatusChange("in-progress")}
            className="btn text-primaryText"
          >
            Start
          </button>
        )}
        {status === "in-progress" && (
          <>
            <button
              onClick={() => handleStatusChange("to-do")}
              className="btn text-primaryText"
            >
              ← Back
            </button>
            <button
              onClick={() => handleStatusChange("done")}
              className="btn text-primaryText"
            >
              Done
            </button>
          </>
        )}
        {status === "done" && (
          <button
            onClick={() => handleStatusChange("in-progress")}
            className="btn text-primaryText"
          >
            Reopen
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;