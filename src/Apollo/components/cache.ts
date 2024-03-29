import { InMemoryCache, gql } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { UserFragment } from "./fragments/UserFragment";
import { UserIdObjFragment } from "./fragments/UserIdObjFragment";

export const cache = new InMemoryCache({
  fragments: createFragmentRegistry(gql`
    ${UserFragment}
    ${UserIdObjFragment}
  `),
});
