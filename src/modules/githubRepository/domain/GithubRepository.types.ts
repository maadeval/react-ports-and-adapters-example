export interface GithubRepositoryId {
  name: string
  organization: string
}

export interface GithubRepository {
  uuid: string
  id: GithubRepositoryId
  url: string
  description: string
  private: boolean
  issuesLenght: number
  pullRequestsLenght: number
}
