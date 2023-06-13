import { useState } from 'react'
import { createWidget } from '../../../modules/widget/application/create/createWidget'
import { WidgetRepository } from '../../../modules/widget/domain/WidgetRepository.types'
import { AlreadyExistWidgetError } from '../../../modules/widget/domain/AlreadyExistWidgetError'
import { InvalidWidgetUrlError } from '../../../modules/widget/domain/InvalidWidgetUrlError'

type FormEvent<T extends Record<string, string>> =
  React.FormEvent<HTMLFormElement> & {
    target: {
      elements: {
        [key in keyof T]: {
          value: T[key]
        }
      }
    }
  }

type FormData = {
  [INPUT_NAME]: string
}

const INPUT_NAME = 'urlValue'

export const useGithubRepositoryCreateForm = (repository: WidgetRepository) => {
  const [errorUrlInput, setErrorUrlInput] = useState<string | null>(null)

  const handleSubmit = (evt: FormEvent<FormData>) => {
    evt.preventDefault()

    const repositoryURL = evt.target.elements[INPUT_NAME].value

    const widget = {
      id: repositoryURL,
      url: repositoryURL,
    }

    createWidget(repository, {
      widget,
    })
      .then(() => setErrorUrlInput(null))
      .catch((err) => {
        if (err instanceof AlreadyExistWidgetError)
          return setErrorUrlInput(
            `This URL widget already exist. Please, try another one.`
          )
        if (err instanceof InvalidWidgetUrlError)
          return setErrorUrlInput(
            'This URL is not valid. Please, try another one. Check the format of the URL.'
          )
      })
  }

  return {
    errorUrlInput,
    handleSubmit,
    INPUT_NAME,
  }
}
