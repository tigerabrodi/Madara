import * as React from 'react'
import { render, screen, userEvent, within } from 'test-utils'
import { useClickOutside } from './useClickOutside'

const DummyComponent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation()
    toggleModal()
  }

  const {
    containerRef: modalRef,
    firstButtonRef: firstButtonElementRef,
  } = useClickOutside(() => setIsModalOpen(false))

  return (
    <>
      {isModalOpen && (
        <div role="alertdialog" ref={modalRef}>
          <h1>Are you sure?</h1>
          <button onClick={toggleModal}>Cancel</button>
        </div>
      )}
      <div>
        <button type="button" onClick={handleButtonClick}>
          Toggle Modal Button
        </button>
        <button type="button">Outside Button</button>
        <button ref={firstButtonElementRef} type="button">
          Outside Button that should not close modal
        </button>
      </div>
    </>
  )
}

const setup = () => {
  render(<DummyComponent />)
  userEvent.click(screen.getByRole('button', { name: /Toggle Modal Button/i }))

  const modal = screen.getByRole('alertdialog')

  const modalHeading = within(modal).getByRole('heading', {
    name: 'Are you sure?',
  })

  return { modal, modalHeading }
}

test('should open modal and close it when click outside', () => {
  setup()

  userEvent.click(screen.getByRole('button', { name: 'Outside Button' }))

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
})

test('should open modal and close it when clicked on cancel button', () => {
  setup()

  userEvent.click(screen.getByRole('button', { name: /cancel/i }))

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
})

test('should open modal and close it when clicked on toggle button', () => {
  setup()

  userEvent.click(screen.getByRole('button', { name: /Toggle Modal Button/i }))

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
})

test('should open modal and not close it when clicked on heading', () => {
  const { modal, modalHeading } = setup()

  userEvent.click(modalHeading)

  expect(modal).toBeInTheDocument()
})

test('should open modal and not close it when clicked on outside button with second ref', () => {
  setup()

  userEvent.click(
    screen.getByRole('button', {
      name: 'Outside Button that should not close modal',
    })
  )

  expect(screen.queryByRole('alertdialog')).toBeInTheDocument()
})
