import * as React from 'react'
import styled, { withTheme } from 'styled-components'
import { ITheme } from 'src/components/theme';

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.colors.success};
  display: flex;
  flex-direction: row;
  align-items: center;
`

interface IProps {
  theme: ITheme
}

class ValidIndicatorComponent extends React.Component<IProps> {
  render() {
    const { theme } = this.props

    return (
      <StyledSpan>
        <svg width="19px" height="16px" viewBox="0 0 19 16" version="1.1">
          <title>893F2164-9EDF-40D3-A792-B756B66B4205</title>
          <desc>Created with sketchtool.</desc>
          <defs />
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g
              id="Interface/Forms"
              transform="translate(-380.000000, -2459.000000)"
              fillRule="nonzero"
              stroke={theme.colors.success}
              strokeWidth="2.5"
            >
              <polyline
                id="Line"
                points="382 2466.55932 387.660582 2473 397 2461"
              />
            </g>
          </g>
        </svg>
        &nbsp;Valid
      </StyledSpan>
    )
  }
}

export const ValidIndicator = withTheme(ValidIndicatorComponent)
