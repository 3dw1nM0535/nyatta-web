import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($email: String!) {
    getUser(email: $email) {
      id
      phone
      properties {
        id
        name
        town
        status
      }
    }
  }
`
