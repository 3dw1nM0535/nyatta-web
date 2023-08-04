import { gql } from '@apollo/client'

export const ONBOARD_USER = gql`
  mutation onboardUser($input: OnboardUserInput!) {
    onboardUser(input: $input) {
      id
    }
  }
` 
