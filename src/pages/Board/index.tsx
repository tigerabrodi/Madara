import { DropResult, DragDropContext } from 'react-beautiful-dnd'
import { BoardColumn } from 'components/BoardColumn'
import { ColumnType, EnumColumnTypesTrimmed } from 'types'
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
import { useStore } from 'lib/store'
import { useSetTasks } from 'hooks/useSetTasks'

const { Done, InProgress, Todo } = EnumColumnTypesTrimmed

export type MobileMoveTaskParams = {
  sourceColumnType: ColumnType
  sourceTaskIndex: number
  destinationColumnType: ColumnType
  setMoveTaskModalOpen: (state: boolean) => void
  isDisabled: boolean
}

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

  const { doneTaskDoc, todoTaskDoc, progressTaskDoc, desktopMoveTask } =
    useGetTaskResults()

  const {
    todoTasks,
    progressTasks,
    doneTasks,
    setTodoTasks,
    setProgressTasks,
    setDoneTasks,
  } = useStore()

  const setTasks = useSetTasks()

  const mobileMoveTask = ({
    isDisabled,
    sourceColumnType,
    sourceTaskIndex,
    destinationColumnType,
    setMoveTaskModalOpen,
  }: MobileMoveTaskParams) => {
    if (isDisabled) return

    const isSourceTodoColumn = sourceColumnType === 'Todo'
    if (isSourceTodoColumn) {
      if (destinationColumnType === 'In progress') {
        switchColumnMobile({
          sourceDoc: todoTaskDoc,
          sourceTasks: todoTasks,
          setSourceTasks: setTodoTasks,
          destinationDoc: progressTaskDoc,
          setDestinationTasks: setProgressTasks,
          destinationTasks: progressTasks,
          destinationColumnType,
          sourceTaskIndex,
        })
      }

      if (destinationColumnType === 'Done') {
        switchColumnMobile({
          sourceDoc: todoTaskDoc,
          sourceTasks: todoTasks,
          setSourceTasks: setTodoTasks,
          destinationDoc: doneTaskDoc,
          destinationTasks: doneTasks,
          setDestinationTasks: setDoneTasks,
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
          sourceTasks: progressTasks,
          setSourceTasks: setProgressTasks,
          destinationDoc: todoTaskDoc,
          destinationTasks: todoTasks,
          setDestinationTasks: setTodoTasks,
          destinationColumnType,
          sourceTaskIndex,
        })
      }

      if (destinationColumnType === 'Done') {
        switchColumnMobile({
          sourceDoc: progressTaskDoc,
          sourceTasks: progressTasks,
          setSourceTasks: setProgressTasks,
          destinationDoc: doneTaskDoc,
          destinationTasks: doneTasks,
          setDestinationTasks: setDoneTasks,
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
          sourceTasks: doneTasks,
          setSourceTasks: setDoneTasks,
          destinationDoc: todoTaskDoc,
          destinationTasks: todoTasks,
          setDestinationTasks: setTodoTasks,
          destinationColumnType,
          sourceTaskIndex,
        })
      }

      if (destinationColumnType === 'In progress') {
        switchColumnMobile({
          sourceDoc: doneTaskDoc,
          sourceTasks: doneTasks,
          setSourceTasks: setDoneTasks,
          destinationDoc: progressTaskDoc,
          destinationTasks: progressTasks,
          setDestinationTasks: setProgressTasks,
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

      const isTodoColumn = Todo === source.droppableId
      if (isTodoColumn) {
        const newTasks = reorderTasks(
          todoTasks,
          source.index,
          destination.index
        )

        setTasks('Todo', newTasks)

        todoTaskDoc.set({
          tasks: newTasks,
        })
      }

      const isProgressColumn = InProgress === source.droppableId
      if (isProgressColumn) {
        const newTasks = reorderTasks(
          progressTasks,
          source.index,
          destination.index
        )

        setTasks('In progress', newTasks)

        progressTaskDoc.set({
          tasks: newTasks,
        })
      }

      const isDoneColumn = Done === source.droppableId
      if (isDoneColumn) {
        const newTasks = reorderTasks(
          doneTasks,
          source.index,
          destination.index
        )

        setTasks('Done', newTasks)

        doneTaskDoc.set({
          tasks: newTasks,
        })
      }
    }

    if (source.droppableId !== destination.droppableId) {
      desktopMoveTask(source, destination)
    }
  }

  const isTodoColumnType = columnType === 'Todo'
  const isProgressColumnType = columnType === 'In progress'
  const isDoneColumnType = columnType === 'Done'

  const tasksForMobileColumn = isNotMobileLayout
    ? todoTasks
    : isTodoColumnType
    ? todoTasks
    : isProgressColumnType
    ? progressTasks
    : doneTasks

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
              mobileMoveTask={mobileMoveTask}
              isMobileDraggable={isMobileDraggable}
              toggleMobileDraggable={toggleMobileDraggable}
            />
            {isNotMobileLayout && (
              <>
                <BoardColumn
                  columnType="In progress"
                  isNotMobileLayout={isNotMobileLayout}
                  tasks={progressTasks}
                  mobileMoveTask={mobileMoveTask}
                  isMobileDraggable={isMobileDraggable}
                  toggleMobileDraggable={toggleMobileDraggable}
                />
                <BoardColumn
                  columnType="Done"
                  isNotMobileLayout={isNotMobileLayout}
                  tasks={doneTasks}
                  mobileMoveTask={mobileMoveTask}
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
