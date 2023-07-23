import { createContext } from 'react';

interface AppContext {
  phone: string | undefined
  user: any // TODO type this
}

export const AppContext = createContext<AppContext>({
  phone: undefined,
  user: undefined,
})
