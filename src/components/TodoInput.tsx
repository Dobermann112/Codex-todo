import { useState } from 'react'
import type { FormEvent } from 'react'

type TodoInputProps = {
  onAdd: (text: string) => void
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedText = text.trim()

    if (!trimmedText) {
      return
    }

    onAdd(trimmedText)
    setText('')
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="やることを入力"
        aria-label="やること入力"
      />
      <button type="submit">追加</button>
    </form>
  )
}
