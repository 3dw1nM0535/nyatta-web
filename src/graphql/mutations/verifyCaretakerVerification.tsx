import { gql } from '@apollo/client'

export const VERIFY_CARETAKER = gql`
  mutation VerifyCaretakerVerificationCode($input: CaretakerVerificationInput!) {
    verifyCaretakerVerificationCode(input: $input) {
      success
    }
  }
`
