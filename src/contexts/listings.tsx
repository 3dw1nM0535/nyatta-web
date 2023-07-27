import { createContext, Dispatch, SetStateAction } from 'react'

import type { ListingOption } from 'types'

interface ListingsContext {
  defaultListing: ListingOption | undefined
  setDefaultListing: Dispatch<SetStateAction<ListingOption | undefined>>
  listings: any[] // TODO type this
  hasListings: boolean
}

const ListingsContext = createContext<ListingsContext>({
  defaultListing: undefined,
  setDefaultListing: () => {},
  listings: [],
  hasListings: false,
})

export default ListingsContext
