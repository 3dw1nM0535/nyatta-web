import { gql } from "@apollo/client";

export const getListings = gql`
  query getListings($input: ListingsInput!) {
    getListings(input: $input) {
      id
      town
    }
  }
`;
