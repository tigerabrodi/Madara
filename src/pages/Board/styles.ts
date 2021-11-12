import styled, { css } from 'styled-components/macro'
import { theme } from 'theme/theme'
import { ReactComponent as HandWriting } from 'assets/hand-writing.svg'
import { media } from 'theme/media'
import { ColumnType } from 'types'
import { focusStyles } from 'styles'

export const BoardMain = styled.main`
  grid-area: main;
  height: 75rem;
  width: 100%;
  display: grid;
  grid-template-areas:
    'title title title'
    'subtitle subtitle subtitle'
    'tablist tablist tablist'
    'board board board';

  grid-template-rows: 11% 4% 10% 75%;
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
  text-align: center;
  font-size: 2.5rem;
  grid-area: title;
  font-family: ${theme.LibreBaskerville};
  color: ${theme.Blue};
  line-height: 1.4;
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

export const Subtitle = styled.p`
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

export const BoardWrapper = styled.div`
  width: 100%;
  grid-area: board;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  height: 100%;
  align-items: center;
  padding: 0;
  ${media.phone} {
    height: 95%;
    column-gap: 2rem;
    padding: 0 2rem;
  }
  ${media.custom(1080)} {
    overflow-x: auto;
    column-gap: 0;
    padding: 0;
  }
`

export const TabList = styled.div`
  grid-area: tablist;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  list-style: none;
  width: 100%;
`

const tabLinkStyles = css`
  font-size: 2.2rem;
  background-color: transparent;
  color: ${theme.Blue};
  font-family: ${theme.SourceSansPro};
  font-weight: 600;
  border: none;
  text-decoration: none;
  ${focusStyles};
`

const columnTypeHighlightStyles = css`
  text-decoration: underline;
  text-underline-offset: 0.2rem;
  text-decoration-thickness: 0.2rem;
`

export const TodoTab = styled.button<{ columnType: ColumnType }>`
  ${tabLinkStyles}
  grid-area: todo;
  ${(props) =>
    props.columnType === 'Todo' &&
    css`
      ${columnTypeHighlightStyles}
    `}
`

export const InProgressTab = styled.button<{ columnType: ColumnType }>`
  ${tabLinkStyles}
  grid-area: inProgress;
  ${(props) =>
    props.columnType === 'In progress' &&
    css`
      ${columnTypeHighlightStyles}
    `}
`

export const DoneTab = styled.button<{ columnType: ColumnType }>`
  ${tabLinkStyles}
  grid-area: done;
  ${(props) =>
    props.columnType === 'Done' &&
    css`
      ${columnTypeHighlightStyles}
    `}
`
