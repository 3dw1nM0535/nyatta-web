import { gql } from '@apollo/client'

export const GET_USER_PROPERTIES = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      id
      properties {
        id
        name
        town
        type
      }
    }
  }
`
