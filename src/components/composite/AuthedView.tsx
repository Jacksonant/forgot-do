import { NoTaskView } from './NoTaskView'
import { TaskListView } from './TaskListView'
import { useTasks } from '../../hooks/useTasks'

export const AuthedView = () => {
  const { tasks, addTask, toggleComplete, deleteTask, editTask } = useTasks()

  if (tasks.length === 0) {
    return <NoTaskView onAddTask={addTask} />
  }

  return (
    <TaskListView
      tasks={tasks}
      onAddTask={addTask}
      onToggleComplete={toggleComplete}
      onDeleteTask={deleteTask}
      onEditTask={editTask}
    />
  )
}