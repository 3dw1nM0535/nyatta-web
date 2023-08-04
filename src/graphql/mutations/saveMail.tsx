import { gql } from '@apollo/client'

export const SAVE_MAIL = gql`
  mutation saveMailing($email: String!) {
    saveMailing(email: $email) {
      success
    }
  }
`
