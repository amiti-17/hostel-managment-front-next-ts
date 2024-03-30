"use client";

import { USERS } from "@/Apollo/queries/users";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";
import { UserContext } from "@/providers/User";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect } from "react";

const FillingUserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { setIsShown, setMessage, setType } = useContext(NotificationContext);
  const { user, setUser } = useContext(UserContext);
  const [getUser, { data, loading, error }] = useLazyQuery(
    USERS.getCurrentUser
  );
  useEffect(() => {
    if (!user?.id) {
      getUser();
    }
  }, []);
  useEffect(() => {
    if (data) {
      setUser(data.getCurrentUser);
    }
  }, [data]);

  if (loading || !user) {
    return <>loading...</>;
  }

  if (error) {
    setMessage(error.message);
    setType("error");
    setIsShown(true); // TODO: think about add router.push('/');
    router.push("/login");
    return <>{error.message}</>;
  }
  return <>{children}</>;
};

export default FillingUserProvider;
