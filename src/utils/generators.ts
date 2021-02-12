import { build, fake } from '@jackfranklin/test-data-bot'

type User = {
  name: string
  email: string
  password: string
}

export const buildUser = build<User>('User', {
  fields: {
    name: fake((f) => f.internet.userName()),
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
  },
})
