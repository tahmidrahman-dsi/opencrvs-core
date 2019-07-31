import styled from 'styled-components'

export const Content = styled.section`
  flex: 1;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.copy};
  ${({ theme }) => theme.fonts.bodyStyle};
`

export const BodyContent = styled.div`
  max-width: 940px;
  margin: 64px auto 0;
  padding: 16px 32px;
  position: relative;
`
export const BodyWrapper = styled.div`
  max-width: 940px;
  margin: 0 auto;
  padding: 16px 32px;
  position: relative;
`
export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  min-height: 100vh;
  width: 100%;
`
export const FullBodyContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 24px;
  margin-top: 68px;
`
