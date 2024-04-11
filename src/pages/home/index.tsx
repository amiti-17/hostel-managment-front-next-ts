"use client";

import { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { USERS } from "@/Apollo/queries/users";
import { User } from "@/config/system/types/generated/types";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";

const Home = () => {
  const { data, loading, error } = useQuery(USERS.getAllUsers);
  const { setMessage, setType, setIsShown, isShown } =
    useContext(NotificationContext);
  useEffect(() => {
    const users: User[] = data?.users;
    console.log("here", users, loading, error);
    setMessage("all right, we got users");
    setType("success");
    setIsShown(true);
    // const user = data.users.
  }, [loading]); // example how to make queries...
  return (
    <>
      Home
      <button
        onClick={() => {
          setIsShown(!isShown);
        }}
      >
        button
      </button>
    </>
  );
};

export default Home;
