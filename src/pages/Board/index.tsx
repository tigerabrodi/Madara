import * as React from 'react'
import firebase from 'firebase/app'
import { DropResult } from 'react-beautiful-dnd'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { BoardColumn } from 'components/BoardColumn'
import { useMedia } from 'hooks/useMedia'
import { useTabArrowSwitch } from 'hooks/useTabArrowSwitch'
import { ColumnType, Task, TaskFirestoreResult } from 'types'
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

enum TrimmedColumnTypeEnum {
  InProgress = 'Inprogress',
  Done = 'Done',
  Todo = 'Todo',
}

export const Board = () => {
  const [columnType, setColumnType] = React.useState<ColumnType>('Todo')

  const isNotMobileLayout = useMedia('min', '425')

  const tabListRef = useTabArrowSwitch()

  const userEmail = firebase.auth().currentUser?.email
  const usersCollection = firebase.firestore().collection('users')

  const [users] = useCollectionData<{
    email: string
    name: string
  }>(usersCollection)

  const getCurrentUserName = (
    users: Array<{ email: string; name: string }>
  ) => {
    return users.find(
      (user) => user.email.toLowerCase() === userEmail?.toLowerCase()
    )?.name
  }

  const userId = firebase.auth().currentUser?.uid

  const todoTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${TrimmedColumnTypeEnum.Todo}Tasks`)
    .doc(TrimmedColumnTypeEnum.Todo)

  const [todoTaskDocResult] = useDocumentData<TaskFirestoreResult>(todoTaskDoc)

  const progressTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${TrimmedColumnTypeEnum.InProgress}Tasks`)
    .doc(TrimmedColumnTypeEnum.InProgress)

  const [progressTaskDocResult] = useDocumentData<TaskFirestoreResult>(
    progressTaskDoc
  )

  const doneTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${TrimmedColumnTypeEnum.Done}Tasks`)
    .doc(TrimmedColumnTypeEnum.Done)

  const [doneTaskDocResult] = useDocumentData<TaskFirestoreResult>(doneTaskDoc)

  const reorder = (tasks: Task[], startIndex: number, endIndex: number) => {
    const result = Array.from(tasks)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    if (destination.index === source.index) {
      return
    }

    if (
      TrimmedColumnTypeEnum.Todo === source.droppableId &&
      source.droppableId === destination.droppableId
    ) {
      if (todoTaskDocResult) {
        const newTasks = reorder(
          todoTaskDocResult.tasks,
          source.index,
          destination.index
        )

        todoTaskDoc.set({
          tasks: newTasks,
        })
      }
    }

    if (
      TrimmedColumnTypeEnum.InProgress === source.droppableId &&
      source.droppableId === destination.droppableId
    ) {
      if (progressTaskDocResult) {
        const newTasks = reorder(
          progressTaskDocResult.tasks,
          source.index,
          destination.index
        )

        progressTaskDoc.set({
          tasks: newTasks,
        })
      }
    }
  }

  const isTodoColumnType = columnType === 'Todo'
  const isProgressColumnType = columnType === 'In progress'
  const isDoneColumnType = columnType === 'Done'

  const tasksForDynamicColumn = isNotMobileLayout
    ? todoTaskDocResult?.tasks
    : isTodoColumnType
    ? todoTaskDocResult?.tasks
    : isProgressColumnType
    ? progressTaskDocResult?.tasks
    : doneTaskDocResult?.tasks

  return (
    <>
      <BoardMain>
        <Title>Welcome {users && getCurrentUserName(users)}!</Title>
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
              aria-selected={isTodoColumnType ? 'true' : 'false'}
            >
              Todo
            </TodoTab>
            <InProgressTab
              role="tab"
              onClick={() => setColumnType('In progress')}
              columnType={columnType}
              tabIndex={-1}
              aria-controls="In-progress"
              aria-selected={isProgressColumnType ? 'true' : 'false'}
            >
              In progress
            </InProgressTab>
            <DoneTab
              role="tab"
              onClick={() => setColumnType('Done')}
              columnType={columnType}
              tabIndex={-1}
              aria-controls="Done"
              aria-selected={isDoneColumnType ? 'true' : 'false'}
            >
              Done
            </DoneTab>
          </TabList>
        )}
        <BoardWrapper>
          <BoardColumn
            columnType={isNotMobileLayout ? 'Todo' : columnType}
            isNotMobileLayout={isNotMobileLayout}
            onDragEnd={onDragEnd}
            tasks={tasksForDynamicColumn}
          />
          {isNotMobileLayout && (
            <>
              <BoardColumn
                columnType="In progress"
                isNotMobileLayout={isNotMobileLayout}
                onDragEnd={onDragEnd}
                tasks={progressTaskDocResult?.tasks}
              />
              <BoardColumn
                columnType="Done"
                isNotMobileLayout={isNotMobileLayout}
                onDragEnd={onDragEnd}
                tasks={doneTaskDocResult?.tasks}
              />
            </>
          )}
        </BoardWrapper>
      </BoardMain>
    </>
  )
}
