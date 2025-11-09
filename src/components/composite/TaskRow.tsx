import pencilIcon from '../../assets/pen-solid.svg'
import trashIcon from '../../assets/trash-solid.svg'

interface Task {
  id: number
  name: string
  completed: boolean
  createdAt: number
  updatedAt: number
}

interface TaskRowProps {
  task: Task
  onToggleComplete: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onMouseEnter: (taskId: number, event: React.MouseEvent) => void
  onMouseLeave: () => void
}

export const TaskRow = ({ 
  task, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  onMouseEnter, 
  onMouseLeave 
}: TaskRowProps) => {
  return (
    <div
      className="task-row"
      onClick={() => onToggleComplete(task.id)}
      onMouseEnter={(e) => onMouseEnter(task.id, e)}
      onMouseLeave={onMouseLeave}
      role="listitem"
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => {}}
        className="task-checkbox"
        aria-label={`Mark task "${task.name}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <span className={`task-name ${task.completed ? "completed" : ""}`}>
        {task.name}
      </span>

      <div className="task-actions" onClick={(e) => e.stopPropagation()} role="group" aria-label="Task actions">
        <button onClick={() => onEdit(task.id)} className="task-action-btn" aria-label={`Edit task "${task.name}"`}>
          <img src={pencilIcon} alt="" className="icon" aria-hidden="true" />
        </button>
        <button onClick={() => onDelete(task.id)} className="task-action-btn" aria-label={`Delete task "${task.name}"`}>
          <img src={trashIcon} alt="" className="icon" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
