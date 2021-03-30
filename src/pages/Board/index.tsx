import * as React from 'react'
import firebase from 'firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { EditModal } from 'components/EditModal'
import { BoardColumn } from 'components/BoardColumn'
import { useMedia } from 'hooks/useMedia'
import { useTabArrowSwitch } from 'hooks/useTabArrowSwitch'
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
  const [isEditFormOpen, setIsEditFormOpen] = React.useState(false)

  const isNotMobileLayout = useMedia('min', '425')

  const tabListRef = useTabArrowSwitch()

  const toggleEditModalForm = () => setIsEditFormOpen(!isEditFormOpen)

  const handleEditModalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const userEmail = firebase.auth().currentUser?.email
  const usersCollection = firebase.firestore().collection('users')

  const [users, isUserLoading] = useCollectionData<{
    email: string
    name: string
  }>(usersCollection)

  if (isUserLoading) {
    return null
  }

  const getCurrentUserName = (
    users: Array<{ email: string; name: string }>
  ) => {
    return users.find(
      (user) => user.email.toLowerCase() === userEmail?.toLowerCase()
    )?.name
  }

  return users ? (
    <>
      <BoardMain>
        <Title>Welcome {getCurrentUserName(users)}!</Title>
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
          />
          {isNotMobileLayout && (
            <>
              <BoardColumn
                columnType="In progress"
                isNotMobileLayout={isNotMobileLayout}
                toggleEditModal={toggleEditModalForm}
              />
              <BoardColumn
                columnType="Done"
                isNotMobileLayout={isNotMobileLayout}
                toggleEditModal={toggleEditModalForm}
              />
            </>
          )}
        </BoardWrapper>
      </BoardMain>
      {isEditFormOpen && (
        <EditModal
          setOpen={setIsEditFormOpen}
          onSuccess={handleEditModalSubmit}
          toggleModal={toggleEditModalForm}
          taskText="Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      )}
    </>
  ) : null
}
