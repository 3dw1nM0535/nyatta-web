import { gql } from '@apollo/client'

export const GET_USER_PROPERTIES = gql`
  query GetUserProperties {
    getUserProperties {
      id
      name
      town
      type
      status
    }
  }
`
