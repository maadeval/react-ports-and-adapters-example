import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProgressBar from 'react-topbar-progress-indicator'
import { topbarProgress } from './topbarProgress'

ProgressBar.config({
  barColors: {
    '0': '#999999',
    '1.0': '#777777',
  },
  shadowBlur: 0.4,
})

export const TopBarProgressByLocation = () => {
  const [progress, setProgress] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    setProgress(true)
  }, [pathname])

  useEffect(() => {
    const callback = () => setProgress(false)

    const event = topbarProgress.subscribe(callback)

    return () => topbarProgress.unsubscribe(event)
  }, [])

  if (!progress) return null

  return <ProgressBar />
}
