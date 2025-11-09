import { useState } from 'react'
import { Modal } from '../atomic/Modal'
import { Input } from '../atomic/Input'

interface AddTaskModalProps {
  onClose: () => void
  onAdd: (taskName: string) => void
  initialValue?: string
  mode?: 'create' | 'edit'
  existingTaskNames?: string[]
}

export const AddTaskModal = ({ onClose, onAdd, initialValue = '', mode = 'create', existingTaskNames = [] }: AddTaskModalProps) => {
  const [taskName, setTaskName] = useState(initialValue)
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!taskName.trim()) {
      setError('Task name cannot be empty')
      return
    }
    
    if (mode === 'create' && existingTaskNames.includes(taskName.trim())) {
      setError('A task with this name already exists')
      return
    }
    
    onAdd(taskName)
    onClose()
  }

  const title = mode === 'edit' ? 'Edit Task' : '+ New Task'
  const submitLabel = mode === 'edit' ? 'Save' : '+ New Task'

  return (
    <Modal 
      title={title} 
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
    >
      <Input
        placeholder="Task Name"
        value={taskName}
        onChange={(value) => {
          setTaskName(value)
          setError('')
        }}
        error={error}
        autoFocus
      />
    </Modal>
  )
}
