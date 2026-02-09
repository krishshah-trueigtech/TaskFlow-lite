import { useTaskContext } from "../context/TaskContext";

const BulkActionBar = () => {
  const { selectedTaskIds, bulkStatusUpdate, bulkDelete } = useTaskContext();
  return (
    <div className="flex p-4 gap-2 items-center ">
      <>
        <button
          onClick={() => bulkStatusUpdate("to-do")}
          className="flex-1 p-2 rounded   text-white"
        >
          To DO
        </button>
        <button
          onClick={() => bulkStatusUpdate("in-progress")}
          className="flex-1 p-2 rounded  text-white"
        >
          In Progress
        </button>
        <button
          onClick={() => bulkStatusUpdate("done")}
          className="flex-1 p-2 rounded  text-white "
        >
          Done
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
