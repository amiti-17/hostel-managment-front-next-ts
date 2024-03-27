"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import getApolloClient from "@/Apollo";
import { ApolloProvider } from "@apollo/client";
import NotificationWrapper from "@/components/NotificationWrapper";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  const router = useRouter();
  const apolloClient = getApolloClient(router);
  return (
    <ApolloProvider client={apolloClient}>
      <NotificationWrapper>{children}</NotificationWrapper>
    </ApolloProvider>
  );
};

export default Providers;
