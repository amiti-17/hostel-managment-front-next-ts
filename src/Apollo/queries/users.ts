import { gql } from "@apollo/client";
// import {} from "./generated/graphql";

export const USERS = {
  getCurrentUser: gql`
    query getCurrentUser {
      getCurrentUser {
        ...UserFragment
        locations {
          ...BaseLocationFragment
        }
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
};
