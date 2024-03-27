import gql from "graphql-tag";

export const WeatherFragment = gql`
  fragment WeatherFragment on Weather {
    id
    currentId
  }
`