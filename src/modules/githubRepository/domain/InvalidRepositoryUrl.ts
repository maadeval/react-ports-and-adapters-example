export class InvalidRepositoryUrl extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidRepositoryUrl'
  }
}
