import { ApolloClient, NormalizedCacheObject, from } from "@apollo/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { fetchConstants } from "@/config/system/constants/fetch";
import { splitLink } from "./components/splitLink";
import { errorLink } from "./components/errorLink";
import { cache } from "./components/cache";

export let globalClient: ApolloClient<NormalizedCacheObject>;

export default function getApolloClient(router: AppRouterInstance) {
  const client = new ApolloClient({
    link: from([errorLink(router), splitLink]),
    cache,
    credentials: fetchConstants.include,
  });
  globalClient = client;
  return client;
}
