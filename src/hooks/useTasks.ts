import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './useRedux'
import { setTasks, addTask as addTaskAction, toggleComplete as toggleCompleteAction, deleteTask as deleteTaskAction, editTask as editTaskAction } from '../store/tasksSlice'

export const useTasks = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)
  const allTasks = useAppSelector(state => state.tasks.tasks)
  
  const userIdentifier = user ? `${user.id}_${user.name}` : null
  const userTasks = allTasks.filter(task => task.userId === userIdentifier)

  useEffect(() => {
    if (userIdentifier) {
      const storedTasks = localStorage.getItem(`tasks_${userIdentifier}`)
      if (storedTasks) {
        dispatch(setTasks(JSON.parse(storedTasks)))
      }
    }
  }, [userIdentifier, dispatch])

  useEffect(() => {
    if (userIdentifier && allTasks.length > 0) {
      const userSpecificTasks = allTasks.filter(task => task.userId === userIdentifier)
      localStorage.setItem(`tasks_${userIdentifier}`, JSON.stringify(userSpecificTasks))
    }
  }, [allTasks, userIdentifier])

  const addTask = (taskName: string) => {
    if (userIdentifier) {
      dispatch(addTaskAction({ name: taskName, userId: userIdentifier }))
    }
  }

  const toggleComplete = (id: number) => {
    dispatch(toggleCompleteAction(id))
  }

  const deleteTask = (id: number) => {
    dispatch(deleteTaskAction(id))
  }

  const editTask = (id: number, taskName: string) => {
    dispatch(editTaskAction({ id, name: taskName }))
  }

  return {
    tasks: userTasks,
    addTask,
    toggleComplete,
    deleteTask,
    editTask
  }
}
