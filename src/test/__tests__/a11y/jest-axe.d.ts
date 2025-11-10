declare module 'jest-axe' {
  export function toHaveNoViolations(): {
    message: () => string
    pass: boolean
  }
}

