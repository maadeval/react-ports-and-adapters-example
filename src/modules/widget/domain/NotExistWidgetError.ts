export class NotExistWidgetError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NotExistWidgetError'
  }
}
