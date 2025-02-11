import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("Day");

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      // Convert date strings back to Date objects
      const todosWithDates = parsedTodos.map((todo) => ({
        ...todo,
        date: new Date(todo.date),
      }));
      setTodos(todosWithDates);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Date.now(),
        text: newTodo.text,
        description: newTodo.description || "",
        completed: false,
        isEditing: false,
        isPinned: false,
        date: currentDate,
        memo: "",
      },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const togglePin = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isPinned: !todo.isPinned } : todo
      )
    );
  };

  const addMemo = (id, memo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, memo } : todo))
    );
  };

  const editTodo = (id, updates) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updates, isEditing: false } : todo
      )
    );
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const navigateDate = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      switch (currentView) {
        case "Day":
          newDate.setDate(prevDate.getDate() + direction);
          break;
        case "Week":
          newDate.setDate(prevDate.getDate() + direction * 7);
          break;
        case "Month":
          newDate.setMonth(prevDate.getMonth() + direction);
          break;
        case "Year":
          newDate.setFullYear(prevDate.getFullYear() + direction);
          break;
      }
      return newDate;
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        currentDate,
        currentView,
        setCurrentView,
        addTodo,
        deleteTodo,
        togglePin,
        addMemo,
        editTodo,
        toggleComplete,
        navigateDate,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
