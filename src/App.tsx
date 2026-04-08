import { FormEvent, useEffect, useState } from 'react';
import { createTodo, fetchTodos, toggleTodo } from './api/todos';
import type { Todo } from './types/todo';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadTodos() {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadTodos();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const newTodo = await createTodo(trimmedTitle);
      setTodos((current) => [newTodo, ...current]);
      setTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggle(id: string) {
    try {
      setError(null);

      const updatedTodo = await toggleTodo(id);

      setTodos((current) =>
        current.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  return (
    <main className="app">
      <div className="container">
        <header className="header">
          <h1>Todo App</h1>
          <p>React + Vite + Kubernetes + Argo CD</p>
        </header>

        <section className="card">
          <form onSubmit={handleSubmit} className="todo-form">
            <input
              type="text"
              placeholder="Add a new todo"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={submitting}
            />
            <button type="submit" disabled={submitting || !title.trim()}>
              {submitting ? 'Adding...' : 'Add'}
            </button>
          </form>

          {error && <p className="error">{error}</p>}

          {loading ? (
            <p>Loading todos...</p>
          ) : todos.length === 0 ? (
            <p>No todos yet.</p>
          ) : (
            <ul className="todo-list">
              {todos.map((todo) => (
                <li key={todo._id} className="todo-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => void handleToggle(todo._id)}
                    />
                    <span className={todo.completed ? 'completed' : ''}>
                      {todo.title}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
