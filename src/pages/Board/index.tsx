import * as React from 'react'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { EditModal } from 'components/EditModal'
import { BoardColumn } from 'components/BoardColumn'
import { ColumnType } from 'types'
import {
  BoardMain,
  BoardWrapper,
  DoneButton,
  InProgressButton,
  Subtitle,
  SubtitleHandWriting,
  SubtitleWrapper,
  Title,
  TodoButton,
} from './styles'

export const Board = () => {
  const [isNotMobileLayout, setIsNotMobileLayout] = React.useState(false)
  const [columnType, setColumnType] = React.useState<ColumnType>('Todo')
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(
    false
  )
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)

  const toggleConfirmationModal = () =>
    setIsConfirmationModalOpen(!isConfirmationModalOpen)
  const toggleEditModalForm = () => setIsEditFormOpen(!isEditFormOpen)

  React.useEffect(() => {
    const checkMobileLayout = () => {
      const isNotMobileLayout = window.matchMedia('(min-width: 425px)').matches
      setIsNotMobileLayout(isNotMobileLayout)
    }

    checkMobileLayout()
    window.addEventListener('resize', checkMobileLayout)
    return () => {
      window.removeEventListener('resize', checkMobileLayout)
    }
  }, [])

  const handleEditModalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleConfirmationModalSubmit = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <>
      <BoardMain>
        <Title>Welcome Tiger Abrodi!</Title>
        <SubtitleWrapper>
          <Subtitle>Manage Your Tasks</Subtitle>
          <SubtitleHandWriting aria-hidden="true" />
        </SubtitleWrapper>
        {!isNotMobileLayout && (
          <>
            <TodoButton
              onClick={() => setColumnType('Todo')}
              columnType={columnType}
            >
              Todo
            </TodoButton>
            <InProgressButton
              onClick={() => setColumnType('In progress')}
              columnType={columnType}
            >
              In progress
            </InProgressButton>
            <DoneButton
              onClick={() => setColumnType('Done')}
              columnType={columnType}
            >
              Done
            </DoneButton>
          </>
        )}
        <BoardWrapper>
          <BoardColumn
            columnType={isNotMobileLayout ? 'Todo' : columnType}
            toggleEditModal={toggleEditModalForm}
            toggleConfirmationModal={toggleConfirmationModal}
            isNotMobileLayout={isNotMobileLayout}
          />
          {isNotMobileLayout && (
            <>
              <BoardColumn
                columnType="In progress"
                toggleEditModal={toggleEditModalForm}
                toggleConfirmationModal={toggleConfirmationModal}
                isNotMobileLayout={isNotMobileLayout}
              />
              <BoardColumn
                columnType="Done"
                toggleEditModal={toggleEditModalForm}
                toggleConfirmationModal={toggleConfirmationModal}
                isNotMobileLayout={isNotMobileLayout}
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
