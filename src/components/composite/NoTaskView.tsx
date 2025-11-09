import { useState } from 'react'
import { Navbar } from './Navbar'
import { AddTaskModal } from './AddTaskModal'
import { Button } from '../atomic/Button'
import './NoTaskView.css'

interface NoTaskViewProps {
  onAddTask: (taskName: string) => void
}

export const NoTaskView = ({ onAddTask }: NoTaskViewProps) => {
  const [showModal, setShowModal] = useState(false)

  const handleAddTask = (taskName: string) => {
    onAddTask(taskName)
    setShowModal(false)
  }

  return (
    <div className="app">
      <Navbar />
      <div className="no-task-container">
        <div className="no-task-card">
          <p className="no-task-text">You have no task.</p>
          <Button onClick={() => setShowModal(true)}>
            + New Task
          </Button>
        </div>
      </div>
      {showModal && <AddTaskModal onClose={() => setShowModal(false)} onAdd={handleAddTask} />}
    </div>
  )
}
