import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { ReactComponent as HandWriting } from 'assets/hand-writing.svg'
import { ReactComponent as LogoutSVG } from 'assets/logout.svg'
import { ReactComponent as AddSVG } from 'assets/add-task.svg'
import { focusStyles } from 'styles'
import { media } from 'theme/media'

/* Logout */
export const LogoutButton = styled.button`
  height: 4.6rem;
  width: 4.6rem;
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 4.5%;
  left: 96%;
  cursor: pointer;
  transition: 0.2s;
  ${media.tablet} {
    &:hover {
      svg {
        transform: translateY(-0.2rem);
      }
    }
  }
  ${focusStyles};
`

export const Logout = styled(LogoutSVG)`
  height: 100%;
  width: 100%;
  ${media.tablet} {
    transition: 0.2s;
  }
`

/* Layout */
export const BoardMain = styled.main`
  grid-area: main;
  display: grid;
  width: 100%;
  height: calc(100vh - 8rem);
  grid-template-areas:
    'title'
    'subtitle'
    'board';
  justify-items: center;
  align-items: center;
  grid-template-rows: 10% 7% 83%;
  ${media.tablet} {
    overflow-y: hidden;
  }
  ${media.desktop} {
    overflow-y: auto;
  }
`

export const Title = styled.h1`
  grid-area: title;
  font-family: ${theme.LibreBaskerville};
  color: ${theme.Blue};
  font-size: 6.4rem;
`

export const SubtitleWrapper = styled.div`
  grid-area: subtitle;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 53.7rem;
`

export const Subtitle = styled.h2`
  font-size: 4.8rem;
  font-family: ${theme.SourceSansPro};
  color: ${theme.Blue};
  font-weight: 600;
`

export const SubtitleHandWriting = styled(HandWriting)`
  height: 6.5rem;
  width: 6.5rem;
  position: relative;
  bottom: 0.5rem;
  fill: ${theme.Blue};
`

/* Board */
export const BoardWrapper = styled.section`
  height: 95%;
  width: 100%;
  grid-area: board;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  ${media.tablet} {
    column-gap: 2rem;
    padding: 0 2rem;
    overflow-x: visible;
  }
  ${media.desktop} {
    overflow-x: auto;
    column-gap: 0;
    padding: 0;
  }
`

export const BoardColumn = styled.section`
  height: 90%;
  width: 30%;
  max-width: 40rem;
  min-width: 35rem;
  background-color: ${theme.Blue};
  box-shadow: 0 0 1rem ${theme.Blue};
  display: grid;
  grid-template-areas:
    'totalTasks status toggleFormButton'
    'inner inner inner';
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: 7%;
  align-content: flex-start;
  align-items: center;
  justify-items: flex-end;
  border-radius: 0.5rem;
  overflow-y: auto;
  ${focusStyles};
`

export const TotalTasks = styled.span`
  grid-area: totalTasks;
  padding: 0 0.6rem;
  background-color: ${theme.LightBlue};
  border-radius: 2em;
  font-size: 2rem;
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  color: ${theme.Blue};
`

export const Status = styled.h3`
  grid-area: status;
  justify-self: flex-start;
  font-size: 2rem;
  border-radius: 0.5rem;
  padding-left: 1rem;
  font-weight: 600;
  font-family: ${theme.SourceSansPro};
  color: ${theme.LightBlue};
`

export const ToggleFormButton = styled.button`
  grid-area: toggleFormButton;
  width: 2.5rem;
  height: 2.5rem;
  background: transparent;
  border: none;
  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  ${focusStyles};
`

export const Toggle = styled(AddSVG)`
  width: 100%;
  height: 100%;
`

export const Inner = styled.section<{ isFormOpen: boolean }>`
  grid-area: inner;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  padding-bottom: 0.5rem;
  max-height: 100%;
  ${(props) =>
    props.isFormOpen &&
    css`
      justify-content: stretch;
    `}
`
