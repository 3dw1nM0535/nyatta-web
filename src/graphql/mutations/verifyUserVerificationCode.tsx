import { gql } from "@apollo/client";

export const verifyUserVerificationCode = gql`
  mutation verifyUserVerificationCode($input: UserVerificationInput!) {
    verifyUserVerificationCode(input: $input) {
      success
    }
  }
`;
