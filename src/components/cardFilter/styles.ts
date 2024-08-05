import styled from 'styled-components'

type CardProps = {
  $ativo: boolean // Note o prefixo $
}

export const Card = styled.div<CardProps>`
  padding: 8px;
  border: 1px solid ${(props) => (props.$ativo ? '#1e90ff' : '#a1a1a1')};
  background-color: ${(props) => (props.$ativo ? '#fff' : '#fcfcfc')};
  color: ${(props) => (props.$ativo ? '#1e90ff' : '#5e5e5e')};
  border-radius: 8px;
  cursor: pointer;
`

export const Count = styled.span`
  font-weight: bold;
  font-size: 24px;
  display: block;
`

export const Label = styled.span`
  font-size: 14px;
`
