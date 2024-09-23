// src/TodoItem.tsx
import React from 'react';
import { Todo } from './types';

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  toggleComplete: (id: number) => void;
  setEditId: (id: number | null) => void;
  setEditText: (text: string) => void;
  editId: number | null;
  editText: string;
  editTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  deleteTodo,
  toggleComplete,
  setEditId,
  setEditText,
  editId,
  editText,
  editTodo,
}) => {
  return (
    <li className={`flex justify-between items-center p-2 my-2 border rounded ${todo.isCompleted ? 'bg-green-200' : 'bg-white'}`}>
      {editId === todo.id ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="border rounded px-2 py-1"
        />
      ) : (
        <span className={`${todo.isCompleted ? 'line-through' : ''}`}>{todo.text}</span>
      )}

      <div className="flex items-center space-x-2">
        {editId === todo.id ? (
          <button onClick={() => editTodo(todo.id)} className="bg-yellow-500 text-white px-3 py-1 rounded">Save</button>
        ) : (
          <button onClick={() => { setEditId(todo.id); setEditText(todo.text); }} className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
        )}
        <button onClick={() => toggleComplete(todo.id)} className="bg-green-500 text-white px-3 py-1 rounded">
          {todo.isCompleted ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
