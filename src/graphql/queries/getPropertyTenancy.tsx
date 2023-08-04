import { gql } from '@apollo/client'

export const GET_PROPERTY_TENANCY = gql`
  query getPropertyTenancy($propertyId: ID!) {
    getPropertyTenancy(propertyId: $propertyId) {
      id
    }
  }
`
