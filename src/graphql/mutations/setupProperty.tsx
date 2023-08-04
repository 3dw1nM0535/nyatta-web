import { gql } from '@apollo/client'

export const SETUP_PROPERTY = gql`
  mutation setupProperty($input: SetupPropertyInput!) {
    setupProperty(input: $input) {
      success
    }
  }
`
