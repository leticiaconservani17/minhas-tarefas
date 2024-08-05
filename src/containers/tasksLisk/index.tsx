import Task from '../../components/Task'
import { MainContainer, Title } from '../../styles'
import { useSelector } from 'react-redux'

import { RootReducer } from '../../store'

const TaskList = () => {
  const { itens } = useSelector((state: RootReducer) => state.tasks)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filter
  )

  const taskFilter = () => {
    let tarefasFiltradas = itens
    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }
      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const FilterResult = (quantidade: number) => {
    let mensage = ''
    const complement =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''

    if (criterio === 'todas') {
      mensage = `${quantidade} tarefa(s) encontrada(s) como: todas ${complement}`
    } else {
      mensage = `${quantidade} tarefa(s) encontrada(s) como: "${`${criterio}=${valor}`}" ${complement}`
    }

    return mensage
  }

  const tasks = taskFilter()
  const mensage = FilterResult(tasks.length)

  return (
    <MainContainer>
      <Title as="p">{mensage}</Title>
      <ul>
        {tasks.map((t) => (
          <li key={t.titulo}>
            <Task
              id={t.id}
              descricao={t.descricao}
              titulo={t.titulo}
              status={t.status}
              prioridade={t.prioridade}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default TaskList
