import { gql } from "@apollo/client";

export const verifyUserVerificationCode = gql`
  mutation VerifyUserVerificationCode($input: UserVerificationInput!) {
    verifyUserVerificationCode(input: $input) {
      success
    }
  }
`;
