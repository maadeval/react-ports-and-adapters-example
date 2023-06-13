import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from './sections/layout/MainLayout/MainLayout'
import { GithubRepositoriesListFactory } from './sections/githubRepository/GithubRepositoriesList/GithubRepositoriesListFactory'
import { GithubRepositoryDetailsFactory } from './sections/githubRepository/GithubRepositoryDetails/GithubRepositoryDetailsFactory'
import { GithubRepositoryCreateFormFactory } from './sections/githubRepository/GithubRepositoryCreateForm/GithubRepositoryCreateFormFactory'

export const Router = () => {
  return <RouterProvider router={router}></RouterProvider>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: GithubRepositoriesListFactory.create(),
      },
      {
        path: '/:organization/:name',
        element: GithubRepositoryDetailsFactory.create(),
      },
      {
        path: '/create',
        element: GithubRepositoryCreateFormFactory.create(),
      },
    ],
  },
])
