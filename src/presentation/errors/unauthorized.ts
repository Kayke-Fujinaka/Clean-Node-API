export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthotized')
    this.name = 'UnauthorizedError'
  }
}
