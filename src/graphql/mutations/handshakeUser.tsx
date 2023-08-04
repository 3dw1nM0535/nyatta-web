import { gql } from "@apollo/client";

export const HANDSHAKE_USER = gql`
  mutation handshake($input: HandshakeInput!) {
    handshake(input: $input) {
      id
      onboarding
    }
  }
`;
