import * as React from 'react'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { EditModal } from 'components/EditModal'
import { BoardColumn } from 'components/BoardColumn'
import { useMedia } from 'hooks/useMedia'
import { ColumnType } from 'types'
import {
  BoardMain,
  BoardWrapper,
  DoneTab,
  InProgressTab,
  Subtitle,
  SubtitleHandWriting,
  SubtitleWrapper,
  Title,
  TodoTab,
  TabList,
} from './styles'

export const Board = () => {
  const [columnType, setColumnType] = React.useState<ColumnType>('Todo')
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(
    false
  )
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)

  const isNotMobileLayout = useMedia('min', '425')

  const toggleConfirmationModal = () =>
    setIsConfirmationModalOpen(!isConfirmationModalOpen)
  const toggleEditModalForm = () => setIsEditFormOpen(!isEditFormOpen)

  const handleEditModalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleConfirmationModalSubmit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const tabListRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const tabs = document.querySelectorAll('[role="tab"]')

    let tabFocusIndex = 0

    const handleArrowTabSwitch = (event: KeyboardEvent) => {
      // Move right
      if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
        tabs[tabFocusIndex].setAttribute('tabindex', '-1')
        if (event.code === 'ArrowRight') {
          tabFocusIndex++
          // If we're at the end, go to the start
          if (tabFocusIndex >= tabs.length) {
            tabFocusIndex = 0
          }
          // Move left
        } else if (event.code === 'ArrowLeft') {
          tabFocusIndex--
          // If we're at the start, move to the end
          if (tabFocusIndex < 0) {
            tabFocusIndex = tabs.length - 1
          }
        }

        tabs[tabFocusIndex].setAttribute('tabindex', '0')
        ;(tabs[tabFocusIndex] as HTMLButtonElement).focus()
      }
    }

    tabListRef.current?.addEventListener('keydown', handleArrowTabSwitch)

    return () =>
      tabListRef.current?.removeEventListener('keydown', handleArrowTabSwitch)
  }, [])

  return (
    <>
      <BoardMain>
        <Title>Welcome Tiger Abrodi!</Title>
        <SubtitleWrapper>
          <Subtitle>Manage Your Tasks</Subtitle>
          <SubtitleHandWriting aria-hidden="true" />
        </SubtitleWrapper>
        {!isNotMobileLayout && (
          <TabList
            role="tablist"
            aria-label="Tabs to switch column"
            ref={tabListRef}
          >
            <TodoTab
              role="tab"
              onClick={() => setColumnType('Todo')}
              columnType={columnType}
              tabIndex={0}
              aria-controls="Todo"
              aria-selected={columnType === 'Todo' ? 'true' : 'false'}
            >
              Todo
            </TodoTab>
            <InProgressTab
              role="tab"
              onClick={() => setColumnType('In progress')}
              columnType={columnType}
              tabIndex={-1}
              aria-controls="In-progress"
              aria-selected={columnType === 'In progress' ? 'true' : 'false'}
            >
              In progress
            </InProgressTab>
            <DoneTab
              role="tab"
              onClick={() => setColumnType('Done')}
              columnType={columnType}
              tabIndex={-1}
              aria-controls="Done"
              aria-selected={columnType === 'Done' ? 'true' : 'false'}
            >
              Done
            </DoneTab>
          </TabList>
        )}
        <BoardWrapper>
          <BoardColumn
            columnType={isNotMobileLayout ? 'Todo' : columnType}
            isNotMobileLayout={isNotMobileLayout}
            toggleEditModal={toggleEditModalForm}
            toggleConfirmationModal={toggleConfirmationModal}
          />
          {isNotMobileLayout && (
            <>
              <BoardColumn
                columnType="In progress"
                isNotMobileLayout={isNotMobileLayout}
                toggleEditModal={toggleEditModalForm}
                toggleConfirmationModal={toggleConfirmationModal}
              />
              <BoardColumn
                columnType="Done"
                isNotMobileLayout={isNotMobileLayout}
                toggleEditModal={toggleEditModalForm}
                toggleConfirmationModal={toggleConfirmationModal}
              />
            </>
          )}
        </BoardWrapper>
      </BoardMain>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          setOpen={setIsConfirmationModalOpen}
          onSuccess={handleConfirmationModalSubmit}
          toggleModal={toggleConfirmationModal}
          text="Do you really want to delete every task in this column?"
        />
      )}

      {isEditFormOpen && (
        <EditModal
          setOpen={setIsEditFormOpen}
          onSuccess={handleEditModalSubmit}
          toggleModal={toggleEditModalForm}
          taskText="Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      )}
    </>
  )
}
