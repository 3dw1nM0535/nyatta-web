import { gql } from "@apollo/client";

export const getTowns = gql`
  query getTowns {
    getTowns {
      id
      town
      postalCode
    }
  }
`;
