export class UnexistedRepository extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnexistedRepository'
  }
}
