import {
  DraggableLocation,
  DropResult,
  DragDropContext,
} from 'react-beautiful-dnd'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { BoardColumn } from 'components/BoardColumn'
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
import { toast } from 'components/Alert'
import { EnumColumnTypesTrimmed, DocumentData } from 'lib/types'
import { useBoardState } from './useBoardState'
import { useGetTaskResults } from './useGetTaskResults'

export const Board = () => {
  const {
    columnType,
    isNotMobileLayout,
    tabListRef,
    isMobileDraggable,
    toggleMobileDraggable,
    getCurrentUserName,
    users,
    switchColumnType,
  } = useBoardState()

  const {
    doneTaskDocResult,
    todoTaskDocResult,
    progressTaskDocResult,
    doneTaskDoc,
    todoTaskDoc,
    progressTaskDoc,
  } = useGetTaskResults()

  const onMoveTask = (
    sourceColumnType: ColumnType,
    sourceTaskIndex: number,
    destColumnType: ColumnType,
    setMoveTaskModalOpen: (state: boolean) => void,
    isDisabled = false
  ) => {
    if (isDisabled) {
      return
    }

    const switchColumnMobile = (
      sourceDoc: DocumentData,
      destDoc: DocumentData,
      sourceDocResult: Data<TaskFirestoreResult, '', ''> | undefined,
      destDocResult: Data<TaskFirestoreResult, '', ''> | undefined,
      destColumnType: ColumnType
    ) => {
      const sourceClone = Array.from(sourceDocResult!.tasks)

      const destClone = destDocResult ? Array.from(destDocResult.tasks) : []

      const [removedTask] = sourceClone.splice(sourceTaskIndex, 1)

      const newTaskToDest: Task = {
        ...removedTask,
        columnType: destColumnType,
      }

      destClone.unshift(newTaskToDest)

      sourceDoc.set({
        tasks: sourceClone,
      })

      destDoc.set({
        tasks: destClone,
      })
    }

    const isSourceTodoColumn = sourceColumnType === 'Todo'
    if (isSourceTodoColumn) {
      if (destColumnType === 'In progress') {
        switchColumnMobile(
          todoTaskDoc,
          progressTaskDoc,
          todoTaskDocResult,
          progressTaskDocResult,
          destColumnType
        )
      }

      if (destColumnType === 'Done') {
        switchColumnMobile(
          todoTaskDoc,
          doneTaskDoc,
          todoTaskDocResult,
          doneTaskDocResult,
          destColumnType
        )
      }
    }

    const isSourceProgressColumn = sourceColumnType === 'In progress'
    if (isSourceProgressColumn) {
      if (destColumnType === 'Todo') {
        switchColumnMobile(
          progressTaskDoc,
          todoTaskDoc,
          progressTaskDocResult,
          todoTaskDocResult,
          destColumnType
        )
      }

      if (destColumnType === 'Done') {
        switchColumnMobile(
          progressTaskDoc,
          doneTaskDoc,
          progressTaskDocResult,
          doneTaskDocResult,
          destColumnType
        )
      }
    }

    const isSourceDoneColumn = sourceColumnType === 'Done'
    if (isSourceDoneColumn) {
      if (destColumnType === 'Todo') {
        switchColumnMobile(
          doneTaskDoc,
          todoTaskDoc,
          doneTaskDocResult,
          todoTaskDocResult,
          destColumnType
        )
      }

      if (destColumnType === 'In progress') {
        switchColumnMobile(
          doneTaskDoc,
          progressTaskDoc,
          doneTaskDocResult,
          progressTaskDocResult,
          destColumnType
        )
      }
    }

    switchColumnType(destColumnType)

    setMoveTaskModalOpen(false)

    toast(
      `Successfully moved task from ${sourceColumnType.toLowerCase()} column to ${destColumnType.toLowerCase()} column.`
    )
  }

  const move = (
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const switchColumnDesktop = (
      sourceDoc: DocumentData,
      destDoc: DocumentData,
      sourceDocResult: Data<TaskFirestoreResult, '', ''>,
      destDocResult: Data<TaskFirestoreResult, '', ''> | undefined,
      destColumnType: ColumnType
    ) => {
      const sourceClone = Array.from(sourceDocResult.tasks)
      const destClone = destDocResult ? Array.from(destDocResult.tasks) : []

      const [removedTask] = sourceClone.splice(droppableSource.index, 1)

      const newTaskToProgress: Task = {
        ...removedTask,
        columnType: destColumnType,
      }

      destClone.splice(droppableDestination.index, 0, newTaskToProgress)

      sourceDoc.set({
        tasks: sourceClone,
      })

      destDoc.set({
        tasks: destClone,
      })
    }

    const fromTodoToProgress =
      droppableSource.droppableId === EnumColumnTypesTrimmed.Todo &&
      droppableDestination.droppableId === EnumColumnTypesTrimmed.InProgress
    if (fromTodoToProgress) {
      if (todoTaskDocResult) {
        switchColumnDesktop(
          todoTaskDoc,
          progressTaskDoc,
          todoTaskDocResult,
          progressTaskDocResult,
          'In progress'
        )
      }
    }

    const fromProgressToTodo =
      droppableSource.droppableId === EnumColumnTypesTrimmed.InProgress &&
      droppableDestination.droppableId === EnumColumnTypesTrimmed.Todo
    if (fromProgressToTodo) {
      if (progressTaskDocResult) {
        switchColumnDesktop(
          progressTaskDoc,
          todoTaskDoc,
          progressTaskDocResult,
          todoTaskDocResult,
          'Todo'
        )
      }
    }

    const fromProgressToDone =
      droppableSource.droppableId === EnumColumnTypesTrimmed.InProgress &&
      droppableDestination.droppableId === EnumColumnTypesTrimmed.Done
    if (fromProgressToDone) {
      if (progressTaskDocResult) {
        switchColumnDesktop(
          progressTaskDoc,
          doneTaskDoc,
          progressTaskDocResult,
          doneTaskDocResult,
          'Done'
        )
      }
    }

    const fromDoneToProgress =
      droppableSource.droppableId === EnumColumnTypesTrimmed.Done &&
      droppableDestination.droppableId === EnumColumnTypesTrimmed.InProgress
    if (fromDoneToProgress) {
      if (doneTaskDocResult) {
        switchColumnDesktop(
          doneTaskDoc,
          progressTaskDoc,
          doneTaskDocResult,
          progressTaskDocResult,
          'In progress'
        )
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

      const isTodoColumn = EnumColumnTypesTrimmed.Todo === source.droppableId
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
        EnumColumnTypesTrimmed.InProgress === source.droppableId
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

      const isDoneColumn = EnumColumnTypesTrimmed.Done === source.droppableId
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

  const tasksForMobileColumn = isNotMobileLayout
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
              onClick={() => switchColumnType('Todo')}
              columnType={columnType}
              tabIndex={0}
              aria-controls="Todo"
              aria-selected={isTodoColumnType ? 'true' : 'false'}
            >
              Todo
            </TodoTab>
            <InProgressTab
              role="tab"
              onClick={() => switchColumnType('In progress')}
              columnType={columnType}
              tabIndex={-1}
              aria-controls="In-progress"
              aria-selected={isProgressColumnType ? 'true' : 'false'}
            >
              In progress
            </InProgressTab>
            <DoneTab
              role="tab"
              onClick={() => switchColumnType('Done')}
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
              tasks={tasksForMobileColumn}
              onMoveTask={onMoveTask}
              isMobileDraggable={isMobileDraggable}
              toggleMobileDraggable={toggleMobileDraggable}
            />
            {isNotMobileLayout && (
              <>
                <BoardColumn
                  columnType="In progress"
                  isNotMobileLayout={isNotMobileLayout}
                  tasks={progressTaskDocResult?.tasks}
                  onMoveTask={onMoveTask}
                  isMobileDraggable={isMobileDraggable}
                  toggleMobileDraggable={toggleMobileDraggable}
                />
                <BoardColumn
                  columnType="Done"
                  isNotMobileLayout={isNotMobileLayout}
                  tasks={doneTaskDocResult?.tasks}
                  onMoveTask={onMoveTask}
                  isMobileDraggable={isMobileDraggable}
                  toggleMobileDraggable={toggleMobileDraggable}
                />
              </>
            )}
          </DragDropContext>
        </BoardWrapper>
      </BoardMain>
    </>
  )
}
