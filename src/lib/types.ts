import firebase from 'firebase/app'

export enum EnumColumnTypesTrimmed {
  InProgress = 'Inprogress',
  Done = 'Done',
  Todo = 'Todo',
}

export type DocumentData =
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
