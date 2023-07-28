import { gql } from '@apollo/client'

export const GET_PROPERTY_UNITS = gql`
  query GetPropertyUnits($propertyId: ID!) {
    getPropertyUnits (propertyId: $propertyId) {
      id
      name
      amenityCount
    }
  }
`
