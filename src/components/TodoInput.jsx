"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useTodo } from "../context/TodoContext";

const TodoInput = () => {
  const { addTodo } = useTodo();
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTodo({
      text: text.trim(),
      description: description.trim(),
    });

    setText("");
    setDescription("");
    setShowDescription(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="bg-[#1f2937] rounded-lg p-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
          className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
        />
        {showDescription && (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description (optional)"
            className="w-full mt-2 bg-transparent text-gray-300 placeholder-gray-400 focus:outline-none resize-none text-sm sm:text-base"
            rows="2"
          />
        )}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2 sm:gap-0">
          <button
            type="button"
            onClick={() => setShowDescription(!showDescription)}
            className="text-xs sm:text-sm text-gray-400 hover:text-gray-300"
          >
            {showDescription ? "Hide description" : "Add description"}
          </button>
          <button
            type="submit"
            className="flex items-center gap-1 px-3 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors text-xs sm:text-sm w-full sm:w-auto justify-center sm:justify-start"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default TodoInput;
