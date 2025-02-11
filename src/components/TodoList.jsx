'use client';

import { useState, useEffect, useRef } from 'react'
import { Pin, MessageSquare, Trash2, MoreVertical, Check, X } from 'lucide-react'
import { useTodo } from '../context/TodoContext'

const TodoList = () => {
  const {
    todos,
    deleteTodo,
    editTodo,
    toggleComplete,
    togglePin,
    addMemo,
    currentDate,
    currentView
  } = useTodo()

  const [openMenu, setOpenMenu] = useState(null)
  const [editingMemo, setEditingMemo] = useState(null)
  const [memoText, setMemoText] = useState('')
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString()
  }

  const isInCurrentView = (todoDate) => {
    const todo = new Date(todoDate)
    const current = new Date(currentDate)
    
    switch (currentView) {
      case 'Day':
        return isSameDay(todo, current)
      case 'Week':
        const weekStart = new Date(current)
        weekStart.setDate(current.getDate() - current.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        return todo >= weekStart && todo <= weekEnd
      case 'Month':
        return todo.getMonth() === current.getMonth() &&
               todo.getFullYear() === current.getFullYear()
      case 'Year':
        return todo.getFullYear() === current.getFullYear()
      default:
        return true
    }
  }

  const filteredTodos = todos
    .filter(todo => isInCurrentView(todo.date))
    .sort((a, b) => {
      if (a.isPinned !== b.isPinned) return b.isPinned ? 1 : -1
      return b.date - a.date
    })

  const handleMemoSubmit = (id) => {
    addMemo(id, memoText)
    setEditingMemo(null)
    setMemoText('')
  }

  return (
    <div className="flex-grow overflow-hidden">
      <ul className="space-y-2 overflow-y-auto flex-grow">
        {filteredTodos.map(todo => (
          <li
            key={todo.id}
            className={`bg-[#1f2937] rounded-lg p-3 ${
              todo.isPinned ? 'border-l-4 border-pink-500' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="mt-1 rounded border-gray-600 text-pink-500 focus:ring-pink-500"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-white text-sm sm:text-base break-words ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                  {todo.text}
                </p>
                {todo.description && (
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 break-words">{todo.description}</p>
                )}
                {todo.memo && !editingMemo && (
                  <p className="text-xs sm:text-sm text-gray-400 mt-2 bg-[#2d3748] p-2 rounded break-words">
                    {todo.memo}
                  </p>
                )}
                {editingMemo === todo.id && (
                  <div className="mt-2">
                    <textarea
                      value={memoText}
                      onChange={(e) => setMemoText(e.target.value)}
                      placeholder="Add a memo..."
                      className="w-full bg-[#2d3748] text-white placeholder-gray-400 p-2 rounded focus:outline-none text-xs sm:text-sm"
                      rows="2"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleMemoSubmit(todo.id)}
                        className="text-green-500 hover:text-green-400"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => setEditingMemo(null)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenMenu(openMenu === todo.id ? null : todo.id)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <MoreVertical size={16} />
                </button>
                {openMenu === todo.id && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-[#2d3748] rounded-md shadow-lg z-50"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          togglePin(todo.id)
                          setOpenMenu(null)
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-gray-300 hover:bg-[#1f2937] w-full"
                      >
                        <Pin size={16} />
                        {todo.isPinned ? 'Unpin' : 'Pin to top'}
                      </button>
                      <button
                        onClick={() => {
                          setEditingMemo(todo.id)
                          setMemoText(todo.memo || '')
                          setOpenMenu(null)
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-gray-300 hover:bg-[#1f2937] w-full"
                      >
                        <MessageSquare size={16} />
                        {todo.memo ? 'Edit memo' : 'Add memo'}
                      </button>
                      <button
                        onClick={() => {
                          deleteTodo(todo.id)
                          setOpenMenu(null)
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm text-red-400 hover:bg-[#1f2937] w-full"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
