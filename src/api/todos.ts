import type { Todo } from '../types/todo';

const API_BASE = '/api/todos';

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(API_BASE);

  if (!response.ok) {
    throw new Error(`Failed to fetch todos: ${response.status}`);
  }

  return response.json();
}

export async function createTodo(title: string): Promise<Todo> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title })
  });

  if (!response.ok) {
    throw new Error(`Failed to create todo: ${response.status}`);
  }

  return response.json();
}

export async function toggleTodo(id: string): Promise<Todo> {
  const response = await fetch(`${API_BASE}/${id}/toggle`, {
    method: 'PATCH'
  });

  if (!response.ok) {
    throw new Error(`Failed to toggle todo: ${response.status}`);
  }

  return response.json();
}
