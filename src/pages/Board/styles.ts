import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { ReactComponent as HandWriting } from 'assets/hand-writing.svg'
import { ReactComponent as LogoutSVG } from 'assets/logout.svg'
import { ReactComponent as AddTaskSVG } from 'assets/add-task.svg'
import { ReactComponent as CardLogoSVG } from 'assets/card-logo.svg'
import { ReactComponent as CardMenuSVG } from 'assets/card-menu.svg'
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
`

export const BoardColumn = styled.section`
  height: 90%;
  width: 30%;
  max-width: 39.5rem;
  min-width: 30rem;
  background-color: ${theme.Blue};
  box-shadow: 0 0 1rem ${theme.Blue};
  display: grid;
  grid-template-areas:
    'totalTasks status addTaskButton'
    'innerColumn innerColumn innerColumn';
  grid-template-columns: 10% 80% 10%;
  grid-template-rows: minmax(7%, auto) minmax(93%, auto);
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

export const AddTaskButton = styled.button`
  grid-area: addTaskButton;
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

export const AddTask = styled(AddTaskSVG)`
  width: 100%;
  height: 100%;
`

export const InnerColumn = styled.section<{ isFormOpen: boolean }>`
  grid-area: innerColumn;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  ${(props) =>
    props.isFormOpen &&
    css`
      justify-content: stretch;
    `}
`

export const Card = styled.article`
  background-color: ${theme.LightBlue};
  border-radius: 0.5rem;
  min-height: 10rem;
  width: 90%;
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: center;
  grid-template-rows: minmax(10%, auto) minmax(70%, auto) minmax(10%, auto);
  grid-template-areas:
    'logo menuButton'
    'text text'
    'date date';
  row-gap: 0.5rem;
  align-items: center;
`

export const CardLogo = styled(CardLogoSVG)`
  grid-area: logo;
  justify-self: start;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
  height: 2.1rem;
  width: 2.7rem;
`

export const CardMenuButton = styled.button`
  grid-area: menuButton;
  justify-self: end;
  margin-right: 1.5rem;
  margin-top: 1.5rem;
  height: 1.6rem;
  width: 1.6rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  ${focusStyles};
`

export const CardMenuLogo = styled(CardMenuSVG)`
  height: 100%;
  width: 100%;
`

export const CardText = styled.p`
  grid-area: text;
  font-weight: 600;
  max-width: 90%;
  justify-self: end;
  font-family: ${theme.SourceSansPro};
  font-size: 1.8rem;
  color: ${theme.Blue};
`

export const CardDate = styled.span`
  grid-area: date;
  justify-self: start;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  font-family: ${theme.SourceSansPro};
  font-size: 1.2rem;
  color: ${theme.Blue};
`

export const AddTaskForm = styled.form`
  background-color: orange;
  margin-bottom: 1rem;
  height: 20rem;
  width: 100%;
`
