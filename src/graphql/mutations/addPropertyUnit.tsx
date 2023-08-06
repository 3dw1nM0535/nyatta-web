import { gql } from '@apollo/client'

export const ADD_PROPERTY_UNIT = gql`
  mutation addPropertyUnit($input: PropertyUnitInput!) {
    addPropertyUnit(input: $input) {
      id
    }
  }
`
