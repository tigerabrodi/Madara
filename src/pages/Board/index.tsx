import * as React from 'react'
import { ConfirmationModal } from 'components/ConfirmationModal'
import { EditModal } from 'components/EditModal'
import { BoardColumn } from 'components/BoardColumn'
import {
  BoardMain,
  BoardWrapper,
  Subtitle,
  SubtitleHandWriting,
  SubtitleWrapper,
  Title,
} from './styles'

export const Board = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = React.useState(
    false
  )
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)

  const toggleConfirmationModal = () =>
    setIsConfirmationModalOpen(!isConfirmationModalOpen)
  const toggleEditModalForm = () => setIsEditFormOpen(!isEditFormOpen)

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
            toggleEditModal={toggleEditModalForm}
            toggleConfirmationModal={toggleConfirmationModal}
          />
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
