import { FC, useEffect } from 'react'
import { topbarProgress } from '../../shared/TopBarProgressByLocation/topbarProgress'
import { WidgetRepository } from '../../../modules/widget/domain/WidgetRepository.types'
import { useGithubRepositoryCreateForm } from './useGithubRepositoryCreateForm'

interface Props {
  repository: WidgetRepository
}

export const GithubRepositoryCreateForm: FC<Props> = ({ repository }) => {
  const { INPUT_NAME, errorUrlInput, handleSubmit } =
    useGithubRepositoryCreateForm(repository)

  useEffect(() => {
    topbarProgress.cancelProgress()
  }, [])

  return (
    <form
      className='flex items-start gap-2 p-8 my-12 border rounded-lg bg-stone-50 border-stone-200'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col flex-1 gap-1'>
        <label className='flex flex-col'>
          <span className='inline-block ml-2 text-stone-600'>Url:</span>
          <input
            className='px-4 py-2 border rounded border-stone-200'
            id={INPUT_NAME}
          />
        </label>
        {errorUrlInput && (
          <p className='ml-2 text-sm text-rose-600' role='alert'>
            {errorUrlInput}
          </p>
        )}
      </div>
      <button
        className='px-4 py-2 mt-6 rounded bg-stone-900 text-stone-100'
        type='submit'
      >
        Add repository
      </button>
    </form>
  )
}
