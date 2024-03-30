import { USERS } from "@/Apollo/queries/users";
import { User } from "@/generated/types";
import { useQuery } from "@apollo/client";
import { SetStateAction, useEffect } from "react";

type UseUserProps = {
  user: User | undefined;
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
};

const useUser = ({ user, setUser }: UseUserProps) => {
  const { data, loading, error } = useQuery(USERS.getCurrentUser);
};

export default useUser;
