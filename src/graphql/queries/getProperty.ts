import { gql } from '@apollo/client'

export const GET_PROPERTY = gql`
  query getProperty($id: ID!) {
    getProperty(id: $id) {
      id
      name
    }
  }
`
