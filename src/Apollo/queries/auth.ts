import { gql } from "@apollo/client";

export const AUTH = {
  login: gql`
    mutation Login($input: AuthLoginInput!) {
      login(authLoginInput: $input) {
        status
      }
    }
  `,
  adminLogin: gql`
    mutation Login($input: AuthLoginInput!) {
      adminLogin(authLoginInput: $input) {
        status
      }
    }
  `,
  logout: gql`
    mutation logout {
      logout {
        status
      }
    }
  `,
  refreshToken: gql`
    mutation GetNewAccessToken {
      refreshToken {
        status
        __typename
      }
    }
  `,
};
