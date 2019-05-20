import * as React from 'react'
import styled from 'styled-components'
import { CircleButton } from '../../../buttons'

interface IMenuAction {
  icon: () => React.ReactNode
  handler: () => void
}
export interface IMobileHeaderProps {
  id?: string
  left?: IMenuAction
  title: string
  right?: IMenuAction
}

const HeaderContainer = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.gradients.gradientNightshade};
  box-shadow: 0px 2px 6px rgba(53, 67, 93, 0.32);
`

const Title = styled.span`
  ${({ theme }) => theme.fonts.bigBodyStyle};
  color: ${({ theme }) => theme.colors.white};
`

const HeaderBody = styled.div`
  margin: 0 16px;
  flex: 1;
  display: flex;
`

const EndComponentContainer = styled.div`
  display: flex;
  flex: 0;

  button {
    padding: 0;
  }
`
class MobileHeader extends React.Component<IMobileHeaderProps> {
  render() {
    const { id, left, right, title } = this.props
    return (
      <HeaderContainer id={id}>
        <EndComponentContainer>
          {left && (
            <CircleButton
              id="mobile_header_left"
              onClick={left.handler}
              dark={true}
            >
              {left.icon()}
            </CircleButton>
          )}
        </EndComponentContainer>
        <HeaderBody>
          <Title id="header_title">{title}</Title>
        </HeaderBody>
        <EndComponentContainer>
          {right && (
            <CircleButton
              id="mobile_header_right"
              onClick={right.handler}
              dark={true}
            >
              {right.icon()}
            </CircleButton>
          )}
        </EndComponentContainer>
      </HeaderContainer>
    )
  }
}

export { MobileHeader }
