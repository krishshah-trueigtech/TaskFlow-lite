import React from "react";

const ErrorBanner = ({ message, onRetry, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-2 right-2 z-50 animate-slide-up">
      <div className="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4 max-w-md">
        <div className="flex-1">
          <p className="font-semibold text-sm">Action Failed</p>
          <p className="text-xs opacity-90">{message}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRetry}
            className="px-3 py-1.5 bg-white text-red-600 text-xs font-bold rounded hover:bg-gray-100 transition-colors"
          >
            Retry
          </button>

          <button
            onClick={onClose}
            className="p-1 hover:bg-red-700 rounded transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBanner;
