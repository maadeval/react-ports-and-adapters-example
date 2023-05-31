import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const GithubRepositoryWidgetSkeleton = () => {
  return (
    <article className='flex flex-col w-full max-w-xs border rounded-md shadow-xl h-[231px] bg-stone-50 border-stone-100 shadow-stone-200'>
      <header className='flex items-center justify-between px-4 py-2 border-b border-b-stone-200'>
        <div>
          <p className='text-sm'>
            Total issues:{' '}
            <Skeleton style={{ display: 'inline-block', width: '2rem' }} />
          </p>
          <p className='text-sm'>
            Total Pulls:{' '}
            <Skeleton style={{ display: 'inline-block', width: '2rem' }} />
          </p>
        </div>
        <p className='flex items-center gap-4'>
          Status:{' '}
          <Skeleton
            style={{
              display: 'inline-block',
              width: '1.5rem',
              height: '1.5rem',
            }}
          />
        </p>
      </header>
      <main className='flex-1 px-4 py-2'>
        <h3 className='text-xl'>
          <Skeleton style={{ display: 'inline-block', width: '50%' }} />
        </h3>
        <p className='py-2 text-stone-600'>
          <Skeleton style={{ display: 'inline-block', width: '100%' }} />
        </p>
      </main>
      <footer className='px-4 py-2 bg-stone-100'>
        <span className='text-sm hover:underline text-stone-600 hover:text-stone-700 hover:decoration-dotted'>
          <Skeleton style={{ display: 'inline-block', width: '6rem' }} />
        </span>
      </footer>
    </article>
  )
}

export const GithubRepositoryWidgetSkeletonList = ({
  numOfRepositories = 3,
}: {
  numOfRepositories?: number
}) => {
  return (
    <section className={'grid grid-cols-3 gap-4 my-8'}>
      {[...new Array(numOfRepositories)].map((_, i) => (
        <GithubRepositoryWidgetSkeleton key={i} />
      ))}
    </section>
  )
}
