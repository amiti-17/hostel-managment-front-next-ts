import gql from "graphql-tag";

export const CurrentFragment = gql`
  fragment CurrentFragment on CurrentWeather {
    id
    dt
    current
  }
`