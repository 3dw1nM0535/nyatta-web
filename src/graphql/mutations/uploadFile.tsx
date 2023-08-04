import { gql } from "@apollo/client";

export const uploadImage = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file)
  }
`;
