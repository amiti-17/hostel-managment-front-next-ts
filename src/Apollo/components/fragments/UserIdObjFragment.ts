import gql from "graphql-tag";

export const UserIdObjFragment = gql`
  fragment UserIdObjFragment on Location {
    users {
      id
    }
  }
  
`;