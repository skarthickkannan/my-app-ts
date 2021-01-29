import React, { useState } from 'react';
import './App.css';

const App = (): JSX.Element => {
  interface ITodo {
    id: string;
    title: string;
    completed: boolean;
  }

  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (title) {
      const newTodos: ITodo[] = [
        ...todos,
        { id: new Date().toString(), title: title, completed: false },
      ];
      setTodos(newTodos);
      setTitle('');
    } else {
      setError('Please enter something');
      setTimeout(() => {
        setError('');
      }, 1000);
    }
  };

  const toggle = (id: number): void => {
    let t: ITodo[] = [...todos];
    t[id].completed = !t[id].completed;
    setTodos(t);
  };

  const deleteTodo = (id: string): void => {
    const to = todos.filter((todo) => todo.id !== id);
    setTodos(to);
  };

  return (
    <div>
      <h1>Todo</h1>
      {error && <h1>{error}</h1>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button>Add</button>
      </form>
      {todos.map((todo: ITodo, index: number) => (
        <div key={todo.id + index}>
          <input type="checkbox" onClick={() => toggle(index)} />

          <h1 style={{ textDecoration: todo.completed ? 'line-through' : '' }}>
            {todo.title}
          </h1>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
