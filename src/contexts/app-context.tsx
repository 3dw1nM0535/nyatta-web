import { createContext } from 'react';

interface AppContext {
  phone: string | undefined
}

export const AppContext = createContext<AppContext>({
  phone: undefined,
})
