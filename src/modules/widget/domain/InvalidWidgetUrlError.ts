export class InvalidWidgetUrlError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidWidgetUrlError'
  }
}
