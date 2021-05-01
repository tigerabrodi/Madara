import { build, fake } from '@jackfranklin/test-data-bot'

export type User = {
  name: string
  email: string
  password: string
}

type Task = {
  text: string
}

export const buildUser = build<User>('User', {
  fields: {
    name: fake((f) => f.internet.userName()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
  },
})

export const buildTask = build<Task>('Task', {
  fields: {
    text: fake((f) => f.lorem.sentence(5)),
  },
})
