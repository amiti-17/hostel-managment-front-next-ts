import { InMemoryCache, gql } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { BaseLocationFragment } from "./fragments/BaseLocationFragment";
import { CurrentFragment } from "./fragments/CurrentFragment";
import { UserFragment } from "./fragments/UserFragment";
import { UserIdObjFragment } from "./fragments/UserIdObjFragment";
import { WeatherFragment } from "./fragments/WeatherFragment";
import { DaysFragment } from "./fragments/DaysFragment";

export const cache = new InMemoryCache({
  fragments: createFragmentRegistry(gql`
    ${UserFragment}
    ${UserIdObjFragment}
    ${BaseLocationFragment}
    ${WeatherFragment}
    ${CurrentFragment}
    ${DaysFragment}
  `)
});