import { gql } from '@apollo/client'

export const SETUP_PROPERTY = gql`
  mutation SetupProperty($input: SetupPropertyInput!) {
    setupProperty(input: $input) {
      success
    }
  }
`
