const getTaskFormFields = (today) => [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter Task Title",
    type: "text",
    rules: {
      required: "Please Enter Task Title",
    },
  },
  {
    name: "priority",
    label: "Priority",
    type: "radio",
    options: ["High", "Medium", "Low"],
    rules: { required: "Please select a priority" },
  },
  {
    name: "dueDate",
    label: "Due Date",
    placeholder: "Enter Date",
    type: "date",
    rules: {
      required: "Due date is required",
      validate: (value) => value >= today || "Due date cannot be in the past",
    },
  },
  {
    name: "assignee",
    label: "Assignee",
    placeholder: "Enter Assignee",
    type: "text",
    rules: {
      required: "Assignee is required",
    },
  },
];

export default getTaskFormFields;
