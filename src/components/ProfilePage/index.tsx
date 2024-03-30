"use client";

import { useQuery } from "@apollo/client";
import Profile from "./Profile";
import { USERS } from "@/Apollo/queries/users";
import { useContext, useEffect } from "react";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";
import { User } from "@/generated/types";
import GeneralPageLayout from "../GeneralPageLayout";

const ProfileWrapper = () => {
  const { data, loading, error } = useQuery(USERS.getCurrentUser);
  const { setIsShown, setMessage, setType } = useContext(NotificationContext);
  useEffect(() => {
    if (!loading && !data) {
      setMessage("Users credentials was expired, please login again.");
      setType("warning");
      setIsShown(true);
    }
    // router.push("/login");
  }, [data, loading]);

  if (error) {
    setMessage(error.message);
    setType("error");
    setIsShown(true); // TODO: think about add router.push('/');
    return <>{error.message}</>;
  }

  if (loading) {
    return <>Loading...</>;
  }

  if (!data) {
    return null;
  }
  const user: User = data.getCurrentUser;
  return (
    <GeneralPageLayout>
      <Profile user={user} />
    </GeneralPageLayout>
  );
};

export default ProfileWrapper;
