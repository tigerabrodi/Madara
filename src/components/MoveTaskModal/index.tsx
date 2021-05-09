import { ModalOverlay } from 'styles'
import {
  MoveTaskModalWrapper,
  MoveTaskModalHeader,
  MoveTaskModalTitle,
  MoveTaskModalCloseButton,
  MoveTaskModalClose,
  MoveTaskModalBody,
  MoveTaskModalButton,
} from './styles'

export const MoveTaskModal = () => {
  return (
    <>
      <MoveTaskModalWrapper aria-labelledby="moveTaskDialogTitle">
        <MoveTaskModalHeader>
          <MoveTaskModalTitle id="moveTaskDialogTitle">
            Move task to column
          </MoveTaskModalTitle>
          <MoveTaskModalCloseButton aria-label="Cancel">
            <MoveTaskModalClose aria-hidden="true" />
          </MoveTaskModalCloseButton>
        </MoveTaskModalHeader>
        <MoveTaskModalBody>
          <MoveTaskModalButton>To do</MoveTaskModalButton>
          <MoveTaskModalButton>In progress</MoveTaskModalButton>
          <MoveTaskModalButton>Done</MoveTaskModalButton>
        </MoveTaskModalBody>
      </MoveTaskModalWrapper>
      <ModalOverlay aria-hidden="true" />
    </>
  )
}
