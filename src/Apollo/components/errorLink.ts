import { onError } from "@apollo/client/link/error";
import { FetchResult, Observable } from "apollo-link";
import { globalClient } from "../";
import { AUTH } from "@/Apollo/queries/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const errorLink = (router: AppRouterInstance) =>
  onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      try {
        for (let err of graphQLErrors) {
          switch (err.extensions?.code) {
            case "UNAUTHENTICATED":
              if (operation.operationName === "GetNewAccessToken") {
                return document.location.pathname === "/"
                  ? ""
                  : router.push("/login");
              }
              return new Observable<FetchResult>((observer: any) => {
                (async () => {
                  try {
                    await globalClient.mutate({
                      mutation: AUTH.refreshToken,
                    });
                    const subscriber = {
                      next: observer.next.bind(observer),
                      error: observer.error.bind(observer),
                      complete: observer.complete.bind(observer),
                    };
                    forward(operation).subscribe(subscriber);
                  } catch (e) {
                    console.warn("onError apollo: ", e);
                    observer.error(e);
                  }
                })();
              });
          }
        }
      } catch (error) {
        console.warn(error);
      }
    }
    if (networkError && window.location.pathname !== "/") {
      router.push("/login"); // TODO: create separate url for network error
    }
  });
