import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { GithubRepositoriesList } from '../../sections/githubRepository/GithubRepositoriesList/GithubRepositoriesList'
import { mock } from 'vitest-mock-extended'
import { GithubRepositoryRepository } from '../../modules/githubRepository/domain/GithubRepositoryRepository.types'
import { renderWithRouter } from '../renderWithRouter'
import { InvalidRepositoryUrl } from '../../modules/githubRepository/domain/InvalidRepositoryUrl'
import { GithubRepositoryMother } from './GithubRepositoryMother'

const mockGithubRepositoryRepository = mock<GithubRepositoryRepository>()

describe('Dashboard', () => {
  it('should render a message if repositories is empty', async () => {
    mockGithubRepositoryRepository.search.mockResolvedValue([])

    renderWithRouter(
      <GithubRepositoriesList repository={mockGithubRepositoryRepository} />
    )

    expect(
      await screen.findByText(/Not found repositories/i)
    ).toBeInTheDocument()
  })

  it('should render a message if pass incorrect url', async () => {
    mockGithubRepositoryRepository.search.mockRejectedValue(
      new InvalidRepositoryUrl('Incorrect repository url')
    )

    renderWithRouter(
      <GithubRepositoriesList repository={mockGithubRepositoryRepository} />
    )

    expect(
      await screen.findByText(/Incorrect repository url/i)
    ).toBeInTheDocument()
  })

  it('should render a list of repositories', async () => {
    const mockRepositories = GithubRepositoryMother()
    mockGithubRepositoryRepository.search.mockResolvedValue([mockRepositories])

    renderWithRouter(
      <GithubRepositoriesList repository={mockGithubRepositoryRepository} />
    )

    expect(
      await screen.findByRole('heading', {
        name: new RegExp(mockRepositories.id.name, 'i'),
      })
    ).toBeInTheDocument()
  })

  it('should render a message if repository not found', async () => {
    mockGithubRepositoryRepository.search.mockRejectedValue(
      new InvalidRepositoryUrl('Repository not found')
    )

    renderWithRouter(
      <GithubRepositoriesList repository={mockGithubRepositoryRepository} />
    )

    expect(await screen.findByText(/Repository not found/i)).toBeInTheDocument()
  })
})
