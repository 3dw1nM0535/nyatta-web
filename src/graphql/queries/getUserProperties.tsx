import { gql } from '@apollo/client'

export const GET_USER_PROPERTIES = gql`
  query getUserProperties {
    getUserProperties {
      id
      name
      town
      type
      status
    }
  }
`
