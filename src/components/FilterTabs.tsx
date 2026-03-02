import type { Filter } from '../types/todo'

type FilterTabsProps = {
  currentFilter: Filter
  onChange: (filter: Filter) => void
}

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'すべて' },
  { value: 'active', label: '未完了' },
  { value: 'completed', label: '完了済み' },
]

export function FilterTabs({ currentFilter, onChange }: FilterTabsProps) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="表示フィルタ">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={currentFilter === option.value ? 'active' : ''}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
