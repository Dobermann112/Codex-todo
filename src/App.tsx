import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { FilterTabs } from './components/FilterTabs'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import type { Filter, Todo } from './types/todo'

const TODO_STORAGE_KEY = 'todo-app-tasks'

const loadTodos = (): Todo[] => {
  const savedTodos = localStorage.getItem(TODO_STORAGE_KEY)
  if (!savedTodos) {
    return []
  }

  try {
    const parsedTodos = JSON.parse(savedTodos) as Todo[]
    if (!Array.isArray(parsedTodos)) {
      return []
    }

    return parsedTodos.filter(
      (todo) =>
        typeof todo.id === 'string' &&
        typeof todo.text === 'string' &&
        typeof todo.completed === 'boolean',
    )
  } catch {
    return []
  }
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<Filter>('all')

  const handleAddTodo = (text: string) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
      },
    ])
  }

  const handleToggleTodo = (id: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleDeleteTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  const handleEditTodo = (id: string, text: string) => {
    const trimmedText = text.trim()
    if (!trimmedText) {
      return
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo,
      ),
    )
  }

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed)
    }

    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed)
    }

    return todos
  }, [filter, todos])

  useEffect(() => {
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  return (
    <main className="todo-app">
      <h1>やることリスト</h1>
      <div className="todo-card">
        <TodoInput onAdd={handleAddTodo} />
        <FilterTabs currentFilter={filter} onChange={setFilter} />
        <TodoList
          todos={visibleTodos}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
      <p className="todo-count">
        合計: {todos.length}件 / 未完了: {todos.filter((todo) => !todo.completed).length}件
      </p>
    </main>
  )
}

export default App
