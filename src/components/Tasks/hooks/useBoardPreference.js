import { useState, useEffect } from "react";

export const useBoardPreference = () => {
  const [collapsedCol, setCollapsedCol] = useState(() => {
    try {
      const saved = localStorage.getItem("columnPreference");
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error(
        "Failed to parse preference from local storage",
        error.message,
      );
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("columnPreference", JSON.stringify(collapsedCol));
  }, [collapsedCol]);

  const toggleColumn = (columnId) => {
    setCollapsedCol((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };
  return { collapsedCol, toggleColumn };
};
