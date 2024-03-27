import gql from "graphql-tag";

export const BaseLocationFragment = gql`
  fragment BaseLocationFragment on Location {
    id
    lat
    lon
    name
    country
    state
  }
`