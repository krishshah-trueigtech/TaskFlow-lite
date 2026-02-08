const SkeletonCard = () => (
  <div className="h-40 flex flex-col justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
    <div className="w-[30%] h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    <div className="w-[80%] h-6 my-2.5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    <div className="space-y-1">
      <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </div>
    <div className="w-full h-9 mt-2.5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
  </div>
);

export default SkeletonCard;
