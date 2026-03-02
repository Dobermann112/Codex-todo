import { useState } from 'react'
import type { Todo } from '../types/todo'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleStartEdit = () => {
    setEditText(todo.text)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleSaveEdit = () => {
    const trimmedText = editText.trim()
    if (!trimmedText) {
      return
    }

    onEdit(todo.id, trimmedText)
    setIsEditing(false)
  }

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            className="todo-edit-input"
            type="text"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSaveEdit()
              }
              if (event.key === 'Escape') {
                handleCancelEdit()
              }
            }}
            aria-label="タスク編集"
            autoFocus
          />
          <div className="todo-actions">
            <button type="button" onClick={handleSaveEdit}>
              保存
            </button>
            <button type="button" onClick={handleCancelEdit}>
              キャンセル
            </button>
          </div>
        </>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
          </label>
          <div className="todo-actions">
            <button type="button" onClick={handleStartEdit}>
              編集
            </button>
            <button type="button" onClick={() => onDelete(todo.id)}>
              削除
            </button>
          </div>
        </>
      )}
    </li>
  )
}
