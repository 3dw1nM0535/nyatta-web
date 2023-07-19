import ReactGA from 'react-ga4'

export const trackPageView = ({ url, title }) =>
  ReactGA.send({ hitType: "pageview", page: url, title })

export const trackEvent = ({ category, action, label, value }) =>
  ReactGA.event({ category, action, label, value })

export const gaSetUserId = (userId) => ReactGA.set({ userId })
