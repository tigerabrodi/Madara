import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { ReactComponent as HandWriting } from 'assets/hand-writing.svg'
import { media } from 'theme/media'
import { ColumnType } from 'types'
import { focusStyles } from 'styles'

export const BoardMain = styled.main`
  grid-area: main;
  height: 70rem;
  width: 100%;
  display: grid;
  grid-template-areas:
    'title title title'
    'subtitle subtitle subtitle'
    'todo inProgress done'
    'board board board';
  grid-template-rows: 10% 5% 7% 78%;
  justify-items: center;
  align-items: center;
  ${media.phone} {
    grid-template-areas:
      'title'
      'subtitle'
      'board';
    grid-template-rows: 10% 7% 83%;
    overflow-y: hidden;
    height: calc(100vh - 8rem);
  }
  ${media.desktop} {
    overflow-y: auto;
  }
`

export const Title = styled.h1`
  font-size: 2.5rem;
  grid-area: title;
  font-family: ${theme.LibreBaskerville};
  color: ${theme.Blue};
  ${media.phone} {
    font-size: 6.4rem;
  }
`

export const SubtitleWrapper = styled.div`
  width: 24.5rem;
  justify-content: space-between;
  grid-area: subtitle;
  display: flex;
  height: 100%;
  align-items: flex-start;
  ${media.phone} {
    align-items: center;
    justify-content: space-evenly;
    width: 53.7rem;
  }
`

export const Subtitle = styled.h2`
  font-size: 2.5rem;
  ${media.phone} {
    font-size: 4.8rem;
  }
  font-family: ${theme.SourceSansPro};
  color: ${theme.Blue};
  font-weight: 600;
`

export const SubtitleHandWriting = styled(HandWriting)`
  height: 3rem;
  width: 3rem;
  bottom: 0.2rem;
  position: relative;
  fill: ${theme.Blue};
  ${media.phone} {
    height: 6.5rem;
    width: 6.5rem;
    bottom: 0.5rem;
  }
`

export const BoardWrapper = styled.section`
  width: 100%;
  grid-area: board;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  height: 100%;
  padding: 0 0.5rem 0.5rem;
  ${media.phone} {
    height: 95%;
    column-gap: 2rem;
    padding: 0 2rem;
  }
  ${media.desktop} {
    overflow-x: auto;
    column-gap: 0;
    padding: 0;
  }
`

const typeButtonStyles = css`
  align-self: flex-end;
  font-size: 2rem;
  background-color: transparent;
  color: ${theme.Blue};
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  border: none;
  ${focusStyles};
`

export const TodoButton = styled.button<{ columnType: ColumnType }>`
  ${typeButtonStyles}
  grid-area: todo;
  ${(props) =>
    props.columnType === 'Todo' &&
    css`
      text-decoration: underline;
    `}
`

export const InProgressButton = styled.button<{ columnType: ColumnType }>`
  ${typeButtonStyles}
  grid-area: inProgress;
  ${(props) =>
    props.columnType === 'In progress' &&
    css`
      text-decoration: underline;
    `}
`

export const DoneButton = styled.button<{ columnType: ColumnType }>`
  ${typeButtonStyles}
  grid-area: done;
  ${(props) =>
    props.columnType === 'Done' &&
    css`
      text-decoration: underline;
    `}
`
