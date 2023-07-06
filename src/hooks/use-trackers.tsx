import va from '@vercel/analytics'

const trackAction = (event: string) => va.track(event)

export function useTrackers() {
  return { trackAction }
}
