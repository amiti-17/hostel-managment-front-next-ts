import gql from "graphql-tag";

export const DaysFragment = gql`
  fragment DaysFragment on DailyWeather {
    id
    dt
    daily
  }
`