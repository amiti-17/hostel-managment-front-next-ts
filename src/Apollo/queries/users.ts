import { gql } from "@apollo/client";

export const USERS = {
  getCurrentUser: gql`
    query getCurrentUser {
      getCurrentUser {
        ...UserFragment
      }
    }
  `,
  getAllUsers: gql`
    query users {
      users {
        id
        preferencesId
        preferences {
          id
          preferredTheme
          userId
        }
        name
        email
        role
      }
    }
  `,
  updatePassword: gql`
    mutation updatePassword($input: UpdateUsersPasswordInput!) {
      updateUsersPassword(updateUsersPassword: $input) {
        status
      }
    }
  `,
};
