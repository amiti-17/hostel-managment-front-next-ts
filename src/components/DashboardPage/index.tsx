"use client";

import { USERS } from "@/Apollo/queries/users";
import { User } from "@/generated/types";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(USERS.getCurrentUser);
  const { getCurrentUser } = data;
  const currentUser: User = getCurrentUser;
  useEffect(() => {
    console.log(data, loading, error);
  }, [data, loading, error]);
  return (
    <>
      <nav>nav</nav>
      <main>main</main>
      <footer>footer</footer>
    </>
  );
};

export default Dashboard;
