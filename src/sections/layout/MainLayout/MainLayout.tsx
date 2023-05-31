import { NavLink, Outlet } from 'react-router-dom'
import { TopBarProgressByLocation } from '../../shared/TopBarProgressByLocation/TopBarProgressByLocation'

export const MainLayout = () => {
  return (
    <>
      <TopBarProgressByLocation />
      <main className='max-w-4xl mx-auto'>
        <header className='pt-4 border-b border-b-stone-200'>
          <div className='flex items-center justify-between'>
            <h1 className='text-lg text-stone-400'>
              List of{' '}
              <span className='block text-2xl text-stone-600'>
                Repositories
              </span>
            </h1>
          </div>
          <nav className='flex items-center gap-2 py-4'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `px-2 py-1 rounded text-stone-600 hover:bg-stone-100 ${
                  isActive ? 'bg-stone-200 hover:bg-stone-300' : ''
                }`
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </header>
        <Outlet />
      </main>
    </>
  )
}
