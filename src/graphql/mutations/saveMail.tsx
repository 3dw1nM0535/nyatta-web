import { gql } from '@apollo/client'

export const SAVE_MAIL = gql`
  mutation SaveMailing($email: String!) {
    saveMailing(email: $email) {
      success
    }
  }
`
