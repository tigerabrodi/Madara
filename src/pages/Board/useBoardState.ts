import { useMedia } from 'hooks/useMedia'
import firebase from 'firebase/app'
import * as React from 'react'
import { useTabArrowSwitch } from 'hooks/useTabArrowSwitch'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { ColumnType } from 'types'

export const useBoardState = () => {
  const [columnType, setColumnType] = React.useState<ColumnType>('Todo')
  const [isMobileDraggable, setIsMobileDraggable] = React.useState(false)
  const isNotMobileLayout = useMedia('min', '425')
  const tabListRef = useTabArrowSwitch()

  const toggleMobileDraggable = (isDisabled = false) =>
    !isDisabled && setIsMobileDraggable(!isMobileDraggable)

  const switchColumnType = (type: ColumnType) => {
    setColumnType(type)
    setIsMobileDraggable(false)
  }

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

  return {
    columnType,
    isNotMobileLayout,
    tabListRef,
    isMobileDraggable,
    toggleMobileDraggable,
    getCurrentUserName,
    users,
    switchColumnType,
  }
}
