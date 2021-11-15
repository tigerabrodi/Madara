export const assertIsNotDisabled = (isDisabled: boolean) => {
  if (isDisabled) return
}

export const trimString = (string: string) => string.split(' ').join('')
