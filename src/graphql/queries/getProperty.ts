import { gql } from '@apollo/client'

export const GET_PROPERTY = gql`
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      id
      name
    }
  }
`
