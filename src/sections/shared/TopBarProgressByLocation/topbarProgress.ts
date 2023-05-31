const subscribe = (callback: () => unknown) => {
  const event = () => callback()

  document.addEventListener('custom-topbar-progress', event)

  return event
}

const unsubscribe = (event: () => unknown) => {
  document.removeEventListener('custom-topbar-progress', event)
}

const cancelProgress = () => {
  const event = new CustomEvent('custom-topbar-progress')

  document.dispatchEvent(event)
}

export const topbarProgress = {
  subscribe,
  unsubscribe,
  cancelProgress,
}
