import { describe, expect, it } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { WidgetRepository } from '../../modules/widget/domain/WidgetRepository.types'
import { GithubRepositoryCreateForm } from '../../sections/githubRepository/GithubRepositoryCreateForm/GithubRepositoryCreateForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockWidgetRepository = mock<WidgetRepository>()

describe('Widget', () => {
  it('should render a error message when pass a invalid URL', async () => {
    const mockWidget = {
      url: 'this is not a url',
    }

    render(<GithubRepositoryCreateForm repository={mockWidgetRepository} />)

    const input = screen.getByLabelText('Url:')
    const button = screen.getByRole('button', { name: 'Add repository' })

    await userEvent.type(input, mockWidget.url)
    await userEvent.click(button)

    expect(screen.getByText(/this URL is not valid/i)).toBeInTheDocument()
  })

  it('should render a error message when pass a saved URL', async () => {
    const sevedUrl = 'https://github.com/maadeval/users-list'
    mockWidgetRepository.search.mockReset()
    mockWidgetRepository.create.mockReset()
    mockWidgetRepository.search.mockResolvedValueOnce([
      {
        url: sevedUrl,
      },
    ])

    render(<GithubRepositoryCreateForm repository={mockWidgetRepository} />)

    const input = screen.getByLabelText(/url/i)
    const button = screen.getByRole('button', { name: 'Add repository' })

    await userEvent.type(input, sevedUrl)
    await userEvent.click(button)

    expect(
      screen.getByText(
        'This URL widget already exist. Please, try another one.'
      )
    ).toBeInTheDocument()
  })
})
