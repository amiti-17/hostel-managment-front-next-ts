"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import getApolloClient from "@/Apollo";
import { ApolloProvider } from "@apollo/client";
import NotificationWrapper from "@/components/NotificationWrapper";
import UserProvider from "./User";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const router = useRouter();
  const apolloClient = getApolloClient(router);
  return (
    <ApolloProvider client={apolloClient}>
      <NotificationWrapper>
        <UserProvider>{children}</UserProvider>
      </NotificationWrapper>
    </ApolloProvider>
  );
};

export default Providers;
