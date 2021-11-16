import { Task } from 'types'
import create from 'zustand'

type Store = {
  todoTasks: Task[]
  progressTasks: Task[]
  doneTasks: Task[]
  setTodoTasks: (todoTasks: Task[]) => void
  setProgressTasks: (progressTasks: Task[]) => void
  setDoneTasks: (doneTasks: Task[]) => void
}

export const useStore = create<Store>((set) => ({
  todoTasks: [],
  progressTasks: [],
  doneTasks: [],
  setTodoTasks: (tasks) =>
    set(() => ({
      todoTasks: tasks,
    })),
  setProgressTasks: (tasks) =>
    set(() => ({
      progressTasks: tasks,
    })),
  setDoneTasks: (tasks) =>
    set(() => ({
      doneTasks: tasks,
    })),
}))
