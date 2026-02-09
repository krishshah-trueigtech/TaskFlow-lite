import { useTaskContext } from "../context/TaskContext";

const BulkActionBar = () => {
  const { selectedTaskIds, bulkPriorityUpdate, bulkDelete } = useTaskContext();
  return (
    <div className="flex p-4 gap-2 items-center ">
      <>
        <button
          onClick={() => bulkPriorityUpdate("Low")}
          className="flex-1 p-2 rounded   text-white"
        >
          Low
        </button>
        <button
          onClick={() => bulkPriorityUpdate("Medium")}
          className="flex-1 p-2 rounded  text-white"
        >
          Medium
        </button>
        <button
          onClick={() => bulkPriorityUpdate("High")}
          className="flex-1 p-2 rounded  text-white "
        >
          High
        </button>
        <button onClick={() => bulkDelete(selectedTaskIds)}>
          {" "}
          Delete Selected{" "}
        </button>
      </>
    </div>
  );
};

export default BulkActionBar;
