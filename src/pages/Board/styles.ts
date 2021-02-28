import styled from 'styled-components/macro'
import { theme } from 'theme/theme'
import { ReactComponent as HandWriting } from 'assets/hand-writing.svg'
import { media } from 'theme/media'

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
  ${media.phone} {
    overflow-y: hidden;
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
  width: 65%;
  grid-area: subtitle;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  ${media.phone} {
    width: 53.7rem;
  }
`

export const Subtitle = styled.h2`
  font-size: 4.8rem;
  font-family: ${theme.SourceSansPro};
  color: ${theme.Blue};
  font-weight: 600;
`

export const SubtitleHandWriting = styled(HandWriting)`
  height: 2.4rem;
  width: 2.4rem;
  bottom: 2px;
  position: relative;
  fill: ${theme.Blue};
  ${media.phone} {
    height: 6.5rem;
    width: 6.5rem;
    bottom: 0.5rem;
  }
`

/* Board */
export const BoardWrapper = styled.section`
  height: 95%;
  width: 100%;
  grid-area: board;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  ${media.phone} {
    column-gap: 2rem;
    padding: 0 2rem;
  }
  ${media.desktop} {
    overflow-x: auto;
    column-gap: 0;
    padding: 0;
  }
`
