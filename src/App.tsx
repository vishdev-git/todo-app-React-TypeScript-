import React, { useState } from 'react';
import { Todo } from './types';
import TodoItem from './TodoItem';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, isCompleted: false }]);
      setNewTodo('');
    }
  };

  const editTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    );
    setTodos(updatedTodos);
    setEditId(null);
    setEditText('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url("https://source.unsplash.com/random/1600x900")' }}>
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-4">Todo App</h1>

        <div className="flex justify-between mb-6">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="border rounded px-3 py-2 flex-grow mr-2 text-gray-800"
            placeholder="Add new todo"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all"
          >
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleComplete={toggleComplete}
              setEditId={setEditId}
              setEditText={setEditText}
              editId={editId}
              editText={editText}
              editTodo={editTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
