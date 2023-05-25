import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <main className='max-w-4xl mx-auto'>
      <Outlet />
    </main>
  )
}
