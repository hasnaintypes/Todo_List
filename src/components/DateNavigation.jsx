"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTodo } from "../context/TodoContext";

const DateNavigation = () => {
  const { currentDate, currentView, setCurrentView, navigateDate } = useTodo();
  const views = ["Day", "Week", "Month", "Year"];

  const formatDate = () => {
    const options = { weekday: "long" };
    const day = currentDate.toLocaleDateString("en-US", options);
    const date = currentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return { day, date };
  };

  const { day, date } = formatDate();

  return (
    <div className="bg-[#2d3748] border-b border-gray-700">
      <div className="flex justify-around p-2 border-b border-gray-700 overflow-x-auto">
        {views.map((view) => (
          <button
            key={view}
            onClick={() => setCurrentView(view)}
            className={`px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm whitespace-nowrap ${
              currentView === view
                ? "text-pink-500 border-b-2 border-pink-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {view}
          </button>
        ))}
      </div>
      <div className="p-4 text-center">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => navigateDate(-1)}
            className="text-gray-400 hover:text-gray-300"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {day}
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">{date}</p>
          </div>
          <button
            onClick={() => navigateDate(1)}
            className="text-gray-400 hover:text-gray-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateNavigation;
