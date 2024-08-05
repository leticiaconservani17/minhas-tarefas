import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import * as enums from '../../utils/enums/tasks'

import { Button, SaveButton } from '../../styles'

import { remover, editar, alteraStatus } from '../../store/reducers/tasks'
import TaskClass from '../../models/Tasks'

type Props = TaskClass

const Task = ({
  descricao: descricaoOriginal,
  status,
  prioridade,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(false)
  const [descricao, setDescription] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescription(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelEdit() {
    setEditMode(false)
    setDescription(descricaoOriginal)
  }

  function alteraStatusTask(e: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        finalizado: e.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTask}
        />
        <S.Title>
          {editMode && <em>Editando:</em>}
          {titulo}
        </S.Title>
      </label>
      <S.Tag parametro="prioridade" prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag parametro="status" status={status}>
        {status}
      </S.Tag>
      <S.Description
        disabled={!editMode}
        value={descricao}
        onChange={(e) => setDescription(e.target.value)}
      />
      <S.Bar>
        {editMode ? (
          <>
            <SaveButton
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    status,
                    prioridade,
                    titulo,
                    id
                  })
                )
                setEditMode(false)
              }}
            >
              Salvar
            </SaveButton>
            <S.CancelButton onClick={cancelEdit}>Cancelar</S.CancelButton>
          </>
        ) : (
          <>
            <Button onClick={() => setEditMode(true)}>Editar</Button>
            <S.CancelButton onClick={() => dispatch(remover(id))}>
              Remover
            </S.CancelButton>
          </>
        )}
      </S.Bar>
    </S.Card>
  )
}

export default Task
