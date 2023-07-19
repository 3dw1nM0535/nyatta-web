import ReactGA from 'react-ga4'

export const trackPageView = ({ url, title }: any) =>
  ReactGA.send({ hitType: "pageview", page: url, title })

export const trackEvent = ({ category, action, label, value }: any) =>
  ReactGA.event({ category, action, label, value })

export const gaSetUserId = (userId: string) => ReactGA.set({ userId })
