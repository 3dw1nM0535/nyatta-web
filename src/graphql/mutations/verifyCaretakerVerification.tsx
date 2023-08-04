import { gql } from '@apollo/client'

export const VERIFY_CARETAKER = gql`
  mutation verifyCaretakerVerificationCode($input: CaretakerVerificationInput!) {
    verifyCaretakerVerificationCode(input: $input) {
      success
    }
  }
`
