import { createContext, Dispatch, SetStateAction } from 'react'

interface ListingsContext {
  defaultListing: string | undefined
  setDefaultListing: Dispatch<SetStateAction<string | undefined>>
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
