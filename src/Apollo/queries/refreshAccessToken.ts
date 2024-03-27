import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { auth } from "./auth";

let attempt = 0;

export const refreshAccessToken = async (
  client: ApolloClient<NormalizedCacheObject>
) => {
  attempt++;

  if (attempt == 5) {
    attempt = 0;
    throw new Error("myError in auth");
  }

  const response = await client.mutate({
    mutation: auth.refreshToken,
  });

  if (response?.data.refreshToken.status) {
    attempt = 0;
  }

  const accessTokenStatus = response.data;
  return accessTokenStatus;
};
