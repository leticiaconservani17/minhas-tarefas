import { useDispatch, useSelector } from 'react-redux'
import CardFilter from '../../components/cardFilter'

import { useNavigate } from 'react-router-dom'

import * as S from './styles'
import { RootReducer } from '../../store'
import { alterarTermo } from '../../store/reducers/filter'
import { Button, Input } from '../../styles'

import * as enums from '../../utils/enums/tasks'

type Props = {
  showFilters: boolean
}

const SideBar = ({ showFilters }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filter)

  return (
    <S.Aside>
      <div>
        {showFilters ? (
          <>
            <Input
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(e) => dispatch(alterarTermo(e.target.value))}
            />
            <S.Filters>
              <CardFilter
                valor={enums.Status.PENDENTE}
                criterio="status"
                legenda="pendentes"
              />
              <CardFilter
                valor={enums.Status.CONCLUIDA}
                criterio="status"
                legenda="concluidas"
              />
              <CardFilter
                valor={enums.Prioridade.URGENTE}
                criterio="prioridade"
                legenda="urgentes"
              />
              <CardFilter
                valor={enums.Prioridade.IMPORTNTE}
                criterio="prioridade"
                legenda="importantes"
              />
              <CardFilter
                valor={enums.Prioridade.NORMAL}
                criterio="prioridade"
                legenda="normal"
              />
              <CardFilter criterio="todas" legenda="todas" />
            </S.Filters>
          </>
        ) : (
          <Button type="button" onClick={() => navigate('/')}>
            Voltar a lista de tarefas
          </Button>
        )}
      </div>
    </S.Aside>
  )
}

export default SideBar
