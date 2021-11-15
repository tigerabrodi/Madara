import {
  DraggableLocation,
  DropResult,
  DragDropContext,
} from 'react-beautiful-dnd'
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types'
import { BoardColumn } from 'components/BoardColumn'
import {
  ColumnType,
  Task,
  TaskFirestoreResult,
  EnumColumnTypesTrimmed,
  DocumentData,
} from 'types'
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
import { useBoardState } from './useBoardState'
import { useGetTaskResults } from './useGetTaskResults'
import { reorderTasks, switchColumnMobile } from './utils'
import { assertIsNotDisabled } from 'lib/utils'

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
    destinationColumnType: ColumnType,
    setMoveTaskModalOpen: (state: boolean) => void,
    isDisabled = false
  ) => {
    assertIsNotDisabled(isDisabled)

    const isSourceTodoColumn = sourceColumnType === 'Todo'
    if (isSourceTodoColumn) {
      if (destinationColumnType === 'In progress') {
        switchColumnMobile({
          sourceDoc: todoTaskDoc,
          sourceDocResult: todoTaskDocResult,
          destinationDoc: progressTaskDoc,
          destinationDocResult: progressTaskDocResult,
          destinationColumnType,
          sourceTaskIndex,
        })
      }

      if (destinationColumnType === 'Done') {
        switchColumnMobile({
          sourceDoc: todoTaskDoc,
          sourceDocResult: todoTaskDocResult,
          destinationDoc: doneTaskDoc,
          destinationDocResult: doneTaskDocResult,
          destinationColumnType,
          sourceTaskIndex,
        })
      }
    }

    const isSourceProgressColumn = sourceColumnType === 'In progress'
    if (isSourceProgressColumn) {
      if (destinationColumnType === 'Todo') {
        switchColumnMobile({
          sourceDoc: progressTaskDoc,
          sourceDocResult: progressTaskDocResult,
          destinationDoc: todoTaskDoc,
          destinationDocResult: todoTaskDocResult,
          destinationColumnType,
          sourceTaskIndex,
        })
      }

      if (destinationColumnType === 'Done') {
        switchColumnMobile({
          sourceDoc: progressTaskDoc,
          sourceDocResult: progressTaskDocResult,
          destinationDoc: doneTaskDoc,
          destinationDocResult: doneTaskDocResult,
          destinationColumnType,
          sourceTaskIndex,
        })
      }
    }

    const isSourceDoneColumn = sourceColumnType === 'Done'
    if (isSourceDoneColumn) {
      if (destinationColumnType === 'Todo') {
        switchColumnMobile({
          sourceDoc: doneTaskDoc,
          sourceDocResult: doneTaskDocResult,
          destinationDoc: todoTaskDoc,
          destinationDocResult: todoTaskDocResult,
          destinationColumnType,
          sourceTaskIndex,
        })
      }

      if (destinationColumnType === 'In progress') {
        switchColumnMobile({
          sourceDoc: doneTaskDoc,
          sourceDocResult: doneTaskDocResult,
          destinationDoc: progressTaskDoc,
          destinationDocResult: progressTaskDocResult,
          destinationColumnType,
          sourceTaskIndex,
        })
      }
    }

    switchColumnType(destinationColumnType)

    setMoveTaskModalOpen(false)

    toast(
      `Successfully moved task from ${sourceColumnType.toLowerCase()} column to ${destinationColumnType.toLowerCase()} column.`
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
          const newTasks = reorderTasks(
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
          const newTasks = reorderTasks(
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
          const newTasks = reorderTasks(
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
