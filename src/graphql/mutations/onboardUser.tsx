import { gql } from '@apollo/client'

export const ONBOARD_USER = gql`
  mutation OnboardUser($input: OnboardUserInput!) {
    onboardUser(input: $input) {
      id
    }
  }
` 
