import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import { alterarFiltro } from '../../store/reducers/filter'
import * as enums from '../../utils/enums/tasks'
import { RootReducer } from '../../store'

export type Props = {
  legenda: string
  criterio: 'prioridade' | 'status' | 'todas'
  valor?: enums.Prioridade | enums.Status
}

const CardFilter = ({ legenda, criterio, valor }: Props) => {
  const dispatch = useDispatch()
  const filter = useSelector((state: RootReducer) => state.filter)
  const tasks = useSelector((state: RootReducer) => state.tasks)

  const verificaAtivo = () => {
    const mesmoCriterio = filter.criterio === criterio
    const mesmoValor = filter.valor === valor

    return mesmoCriterio && mesmoValor
  }

  const contarTask = () => {
    if (criterio === 'todas') return tasks.itens.length
    if (criterio === 'prioridade') {
      return tasks.itens.filter((item) => item.prioridade === valor).length
    }
    if (criterio === 'status') {
      return tasks.itens.filter((item) => item.status === valor).length
    }
  }

  const filtrar = () => {
    dispatch(
      alterarFiltro({
        criterio,
        valor
      })
    )
  }
  const contador = contarTask()
  const ativo = verificaAtivo()

  return (
    <S.Card $ativo={ativo} onClick={filtrar}>
      {' '}
      {/* Note o prefixo $ */}
      <S.Count>{contador}</S.Count>
      <S.Label>{legenda}</S.Label>
    </S.Card>
  )
}

export default CardFilter
