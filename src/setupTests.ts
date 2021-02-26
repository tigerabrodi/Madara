import '@testing-library/jest-dom/extend-expect'
import { configure } from 'test-utils'

configure({ defaultHidden: true })

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})
