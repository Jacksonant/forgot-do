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
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => {}}
        className="task-checkbox"
      />
      <span className={`task-name ${task.completed ? "completed" : ""}`}>
        {task.name}
      </span>

      <div className="task-actions" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onEdit(task.id)} className="task-action-btn">
          <img src={pencilIcon} alt="edit" className="icon" />
        </button>
        <button onClick={() => onDelete(task.id)} className="task-action-btn">
          <img src={trashIcon} alt="delete" className="icon" />
        </button>
      </div>
    </div>
  )
}
