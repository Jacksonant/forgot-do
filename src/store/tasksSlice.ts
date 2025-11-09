import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  name: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  userId: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (
      state,
      action: PayloadAction<{ name: string; userId: string }>
    ) => {
      const now = Date.now();
      const newTask = {
        id: now,
        name: action.payload.name,
        completed: false,
        createdAt: now,
        updatedAt: now,
        userId: action.payload.userId,
      };
      state.tasks.push(newTask);
    },
    toggleComplete: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        task.updatedAt = Date.now();
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.name = action.payload.name;
        task.updatedAt = Date.now();
      }
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const {
  setTasks,
  addTask,
  toggleComplete,
  deleteTask,
  editTask,
  clearTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;
