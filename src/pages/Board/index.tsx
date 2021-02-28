import * as React from 'react'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { EditModal } from 'components/EditModal'
import { BoardColumn, ColumnType } from 'components/BoardColumn'
import {
  BoardMain,
  BoardWrapper,
  Subtitle,
  SubtitleHandWriting,
  SubtitleWrapper,
  Title,
} from './styles'

export const Board = () => {
  const [isNotMobileLayout, setIsNotMobileLayout] = React.useState(false)
  const [columnType] = React.useState<ColumnType>('Todo')
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

  return (
    <>
      <BoardMain>
        <Title>Welcome Tiger Abrodi!</Title>
        <SubtitleWrapper>
          <Subtitle>Manage Your Tasks</Subtitle>
          <SubtitleHandWriting aria-hidden="true" />
        </SubtitleWrapper>
        <BoardWrapper>
          <BoardColumn
            columnType={isNotMobileLayout ? 'Todo' : columnType}
            toggleEditModal={toggleEditModalForm}
            toggleConfirmationModal={toggleConfirmationModal}
          />
          {isNotMobileLayout && (
            <>
              <BoardColumn
                columnType="In progress"
                toggleEditModal={toggleEditModalForm}
                toggleConfirmationModal={toggleConfirmationModal}
              />
              <BoardColumn
                columnType="Done"
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
          toggleModal={toggleConfirmationModal}
          text="Do you really want to delete every task in this column?"
        />
      )}

      {isEditFormOpen && (
        <EditModal
          setOpen={setIsEditFormOpen}
          toggleModal={toggleEditModalForm}
          taskText="Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      )}
    </>
  )
}
