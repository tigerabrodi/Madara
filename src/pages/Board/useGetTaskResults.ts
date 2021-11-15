import firebase from 'firebase/app'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { TaskFirestoreResult, EnumColumnTypesTrimmed } from 'types'

export const useGetTaskResults = () => {
  const userId = firebase.auth().currentUser?.uid

  const todoTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${EnumColumnTypesTrimmed.Todo}Tasks`)
    .doc(EnumColumnTypesTrimmed.Todo)
  const [todoTaskDocResult] = useDocumentData<TaskFirestoreResult>(todoTaskDoc)

  const progressTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${EnumColumnTypesTrimmed.InProgress}Tasks`)
    .doc(EnumColumnTypesTrimmed.InProgress)
  const [progressTaskDocResult] =
    useDocumentData<TaskFirestoreResult>(progressTaskDoc)

  const doneTaskDoc = firebase
    .firestore()
    .collection(`users/${userId}/${EnumColumnTypesTrimmed.Done}Tasks`)
    .doc(EnumColumnTypesTrimmed.Done)
  const [doneTaskDocResult] = useDocumentData<TaskFirestoreResult>(doneTaskDoc)

  return {
    todoTaskDocResult,
    progressTaskDocResult,
    doneTaskDocResult,
    doneTaskDoc,
    progressTaskDoc,
    todoTaskDoc,
  }
}
