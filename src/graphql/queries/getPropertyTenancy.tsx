import { gql } from '@apollo/client'

export const GET_PROPERTY_TENANCY = gql`
  query GetPropertyTenancy($propertyId: ID!) {
    getPropertyTenancy(propertyId: $propertyId) {
      id
    }
  }
`
