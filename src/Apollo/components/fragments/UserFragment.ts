import gql from "graphql-tag";

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    name
    email
    roles
    phone
    readDashboardPostIds
    profileImage {
      id
      name
      type
      imageSrc
    }
    profileImageId
    preferences {
      id
      preferredTheme
      userId
    }
    preferencesId
    groupList {
      id
      identification
      isGroup
      isPrivate
      usersIdsList
      createdAt
      updatedAt
    }
    groupIdsList
    createdAt
    updatedAt
  }
`;
