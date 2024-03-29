"use client";

import { USERS } from "@/Apollo/queries/users";
import { User } from "@/generated/types";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dashboard from "./Dashboard";

const DashboardWrapper = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(USERS.getCurrentUser);
  useEffect(() => {
    console.log(data, loading, error);
  }, [data, loading, error]);
  useEffect(() => {
    if (!loading && !data) {
      router.push("/login");
    }
  }, [data, loading]);

  if (loading) {
    return <>loading...</>;
  }

  const user: User = data.getCurrentUser;
  return <Dashboard user={user} />;
};

export default DashboardWrapper;
