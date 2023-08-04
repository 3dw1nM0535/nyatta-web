import { gql } from "@apollo/client";

export const sendVerificationCode = gql`
  mutation sendVerificationCode($input: VerificationInput!) {
    sendVerificationCode(input: $input) {
      success
    }
  }
`;
