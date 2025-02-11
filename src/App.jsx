"use client";

import { TodoProvider } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DateNavigation from "./components/DateNavigation";

const App = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-pink-500 to-pink-600 py-4 sm:py-8 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md bg-[#2d3748] shadow-xl rounded-lg overflow-hidden">
          <DateNavigation />
          <div className="px-4 sm:px-6 py-4">
            <TodoInput />
            <TodoList />
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
