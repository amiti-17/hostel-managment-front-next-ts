import gql from "graphql-tag";

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    preferencesId
    preferences {
      id
      preferredTheme
      userId
    }
    name
    email
    roles
    profileImage {
      id
      name
      type
      imageSrc
    }
  }
`;
