import { SetStateAction } from "react";
import { useQuery } from "@apollo/client";
import { User } from "@/config/system/types/generated/types";
import { USERS } from "@/Apollo/queries/users";
import { NotificationType } from "@/components/NotificationWrapper/NotificationProvider";
import ifNoCurrentUserFound from "@/functions/notification/ifNoCurrentUserFound";

type UseUserProps = {
  user: User | undefined;
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
  setIsShown: React.Dispatch<SetStateAction<boolean>>;
  setMessage: React.Dispatch<SetStateAction<string>>;
  setType: React.Dispatch<SetStateAction<NotificationType>>;
};

const useUser = ({
  user,
  setUser,
  setIsShown,
  setMessage,
  setType,
}: UseUserProps) => {
  const { data, loading, error } = useQuery(USERS.getCurrentUser, {
    onCompleted(data) {
      if (!data) {
        ifNoCurrentUserFound({ setMessage, setType, setIsShown });
      }
    },
  });

  const myUser: User | undefined = data?.getCurrentUser;
  if (!user) setUser(myUser);

  return {
    loading,
    error,
  };
};

export default useUser;
