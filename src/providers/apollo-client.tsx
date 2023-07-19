import { PropsWithChildren } from 'react'

import { ApolloProvider as ApolloClientProvider } from '@apollo/client'
import { useSession } from 'next-auth/react'

import { createClient } from 'apollo/createClient'

const ApolloProvider = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession()
  // TODO type this
  const client = createClient((session as any)?.token)

  return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
}

export default ApolloProvider
