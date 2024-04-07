"use client";

import { ReactNode, useContext } from "react";
import useUser from "@/Hooks/useUser";
import NavBar from "@/components/NavBar";
import { UserContext } from "@/providers/User";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";

const GeneralPageLayout = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useContext(UserContext);
  const { setIsShown, setMessage, setType } = useContext(NotificationContext);
  const { loading, error } = useUser({
    user,
    setUser,
    setIsShown,
    setMessage,
    setType,
  });

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    setMessage(error.message);
    setType("error");
    setIsShown(true); // TODO: think about add router.push('/');
    return <>{error.message}</>;
  }

  return (
    <>
      <NavBar />
      <>{user && children}</>
      <>{!user && "something went wrong"}</>
    </>
  );
};

export default GeneralPageLayout;
