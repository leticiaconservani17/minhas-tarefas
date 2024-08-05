import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Tasks'
import * as enums from '../../utils/enums/tasks'

type TaskState = {
  itens: Task[]
}

const initialState: TaskState = {
  itens: []
}

const tasksSlice = createSlice({
  name: 'tarefas',
  initialState: initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((task) => task.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.itens.findIndex((t) => t.id === action.payload.id)
      if (taskIndex >= 0) {
        state.itens[taskIndex] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const tarefaExiste = state.itens.find(
        (task) =>
          task.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )
      if (tarefaExiste) {
        alert('Já existe essa tarefa')
      } else {
        const lastTask = state.itens[state.itens.length - 1]
        const NewTask = {
          ...action.payload,
          id: lastTask ? lastTask.id + 1 : 1
        }
        state.itens.push(NewTask)
      }
    },
    alteraStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const taskIndex = state.itens.findIndex((t) => t.id === action.payload.id)

      if (taskIndex >= 0) {
        state.itens[taskIndex].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alteraStatus } = tasksSlice.actions

export default tasksSlice.reducer
