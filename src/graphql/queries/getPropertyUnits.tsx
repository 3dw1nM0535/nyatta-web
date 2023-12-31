import { gql } from '@apollo/client'

export const GET_PROPERTY_UNITS = gql`
  query getPropertyUnits($propertyId: ID!) {
    getPropertyUnits (propertyId: $propertyId) {
      id
      name
      type
      price
      state
      amenityCount
    }
  }
`
