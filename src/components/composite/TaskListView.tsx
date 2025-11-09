import { useState } from 'react'
import { Navbar } from './Navbar'
import { SummaryCard } from './SummaryCard'
import { TaskTable } from './TaskTable'
import { AddTaskModal } from './AddTaskModal'
import './TaskListView.css'

interface Task {
  id: number
  name: string
  completed: boolean
  createdAt: number
  updatedAt: number
}

interface TaskListViewProps {
  tasks: Task[]
  onAddTask: (taskName: string) => void
  onToggleComplete: (id: number) => void
  onDeleteTask: (id: number) => void
  onEditTask: (id: number, taskName: string) => void
}

export const TaskListView = ({ tasks, onAddTask, onToggleComplete, onDeleteTask, onEditTask }: TaskListViewProps) => {
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const completedCount = tasks.filter(t => t.completed).length
  const latestTasks = [...tasks]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 3)

  const handleEdit = (id: number) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      setEditingTask(task)
    }
  }

  return (
    <div className="app">
      <Navbar />
      <div className="task-list-content">
        <div className="summary-cards">
          <SummaryCard
            title="Tasks Completed"
            type="percentage"
            data={{ value: completedCount, total: tasks.length }}
          />
          <SummaryCard
            title="Latest Created Tasks"
            type="list"
            data={{
              items: latestTasks.map(t => ({ text: t.name, completed: t.completed }))
            }}
          />
          <SummaryCard
            type="chart"
            data={{ value: completedCount, total: tasks.length }}
          />
        </div>
        <TaskTable
          tasks={tasks}
          onToggleComplete={onToggleComplete}
          onEdit={handleEdit}
          onDelete={onDeleteTask}
          onAddNew={() => setShowModal(true)}
        />
      </div>
      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAdd={(name) => {
            onAddTask(name)
            setShowModal(false)
          }}
          existingTaskNames={tasks.map(t => t.name)}
        />
      )}
      {editingTask && (
        <AddTaskModal
          mode="edit"
          initialValue={editingTask.name}
          onClose={() => setEditingTask(null)}
          onAdd={(name) => {
            onEditTask(editingTask.id, name)
            setEditingTask(null)
          }}
        />
      )}
    </div>
  )
}
