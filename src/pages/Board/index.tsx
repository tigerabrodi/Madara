import * as React from 'react'
import firebase from 'firebase/app'
import {
  DraggableLocation,
  DropResult,
  DragDropContext,
} from 'react-beautiful-dnd'
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

enum ETrimmedColumnType {
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
    .collection(`users/${userId}/${ETrimmedColumnType.Todo}Tasks`)
    .doc(ETrimmedColumnType.Todo)

  const [todoTaskDocResult] = useDocumentData<TaskFirestoreResult>(todoTaskDoc)

  const progressTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${ETrimmedColumnType.InProgress}Tasks`)
    .doc(ETrimmedColumnType.InProgress)

  const [progressTaskDocResult] = useDocumentData<TaskFirestoreResult>(
    progressTaskDoc
  )

  const doneTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${ETrimmedColumnType.Done}Tasks`)
    .doc(ETrimmedColumnType.Done)

  const [doneTaskDocResult] = useDocumentData<TaskFirestoreResult>(doneTaskDoc)

  const move = (
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const fromTodoToProgress =
      droppableSource.droppableId === ETrimmedColumnType.Todo &&
      droppableDestination.droppableId === ETrimmedColumnType.InProgress
    if (fromTodoToProgress) {
      if (todoTaskDocResult) {
        const todoClone = Array.from(todoTaskDocResult.tasks)
        const progressClone = progressTaskDocResult
          ? Array.from(progressTaskDocResult.tasks)
          : []
        const [removedTask] = todoClone.splice(droppableSource.index, 1)

        const newTaskToProgress: Task = {
          ...removedTask,
          columnType: 'In progress',
        }

        progressClone.splice(droppableDestination.index, 0, newTaskToProgress)

        todoTaskDoc.set({
          tasks: todoClone,
        })

        progressTaskDoc.set({
          tasks: progressClone,
        })
      }
    }

    const fromProgressToTodo =
      droppableSource.droppableId === ETrimmedColumnType.InProgress &&
      droppableDestination.droppableId === ETrimmedColumnType.Todo
    if (fromProgressToTodo) {
      if (progressTaskDocResult) {
        const progressClone = Array.from(progressTaskDocResult.tasks)
        const todoClone = todoTaskDocResult
          ? Array.from(todoTaskDocResult.tasks)
          : []

        const [removedTask] = progressClone.splice(droppableSource.index, 1)

        const newTaskToTodo: Task = {
          ...removedTask,
          columnType: 'Todo',
        }

        todoClone.splice(droppableDestination.index, 0, newTaskToTodo)

        progressTaskDoc.set({
          tasks: progressClone,
        })

        todoTaskDoc.set({
          tasks: todoClone,
        })
      }
    }

    const fromProgressToDone =
      droppableSource.droppableId === ETrimmedColumnType.InProgress &&
      droppableDestination.droppableId === ETrimmedColumnType.Done
    if (fromProgressToDone) {
      if (progressTaskDocResult) {
        const progressClone = Array.from(progressTaskDocResult.tasks)
        const doneClone = doneTaskDocResult
          ? Array.from(doneTaskDocResult.tasks)
          : []

        const [removedTask] = progressClone.splice(droppableSource.index, 1)

        const newTaskToDone: Task = {
          ...removedTask,
          columnType: 'Done',
        }

        doneClone.splice(droppableDestination.index, 0, newTaskToDone)

        progressTaskDoc.set({
          tasks: progressClone,
        })

        doneTaskDoc.set({
          tasks: doneClone,
        })
      }
    }

    const fromDoneToProgress =
      droppableSource.droppableId === ETrimmedColumnType.Done &&
      droppableDestination.droppableId === ETrimmedColumnType.InProgress
    if (fromDoneToProgress) {
      if (doneTaskDocResult) {
        const doneClone = Array.from(doneTaskDocResult.tasks)
        const progressClone = progressTaskDocResult
          ? Array.from(progressTaskDocResult.tasks)
          : []

        const [removedTask] = doneClone.splice(droppableSource.index, 1)

        const newTaskToProgress: Task = {
          ...removedTask,
          columnType: 'In progress',
        }

        progressClone.splice(droppableDestination.index, 0, newTaskToProgress)

        doneTaskDoc.set({
          tasks: doneClone,
        })

        progressTaskDoc.set({
          tasks: progressClone,
        })
      }
    }
  }

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

    const isSameDroppableId = source.droppableId === destination.droppableId
    if (isSameDroppableId) {
      const isSamePosition = destination.index === source.index
      if (isSamePosition) {
        return
      }

      const isTodoColumn = ETrimmedColumnType.Todo === source.droppableId
      if (isTodoColumn) {
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

      const isProgressColumn =
        ETrimmedColumnType.InProgress === source.droppableId
      if (isProgressColumn) {
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

      const isDoneColumn = ETrimmedColumnType.Done === source.droppableId
      if (isDoneColumn) {
        if (doneTaskDocResult) {
          const newTasks = reorder(
            doneTaskDocResult.tasks,
            source.index,
            destination.index
          )

          doneTaskDoc.set({
            tasks: newTasks,
          })
        }
      }
    }

    if (source.droppableId !== destination.droppableId) {
      move(source, destination)
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
          <DragDropContext onDragEnd={onDragEnd}>
            <BoardColumn
              columnType={isNotMobileLayout ? 'Todo' : columnType}
              isNotMobileLayout={isNotMobileLayout}
              tasks={tasksForDynamicColumn}
            />
            {isNotMobileLayout && (
              <>
                <BoardColumn
                  columnType="In progress"
                  isNotMobileLayout={isNotMobileLayout}
                  tasks={progressTaskDocResult?.tasks}
                />
                <BoardColumn
                  columnType="Done"
                  isNotMobileLayout={isNotMobileLayout}
                  tasks={doneTaskDocResult?.tasks}
                />
              </>
            )}
          </DragDropContext>
        </BoardWrapper>
      </BoardMain>
    </>
  )
}
