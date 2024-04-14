import { SetStateAction, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { User } from "@/config/system/types/generated/types";
import { USERS } from "@/Apollo/queries/users";
import { NotificationType } from "@/components/NotificationWrapper/NotificationProvider";
import ifNoCurrentUserFound from "@/functions/notification/ifNoCurrentUserFound";
import processGraphqlErrors from "@/CustomError/processGraphqlErrors";

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
  const [makeQuery, { loading, error }] = useLazyQuery(USERS.getCurrentUser, {
    onCompleted(data) {
      if (!data) {
        ifNoCurrentUserFound({ setMessage, setType, setIsShown });
      }
      const myUser: User | undefined = data?.getCurrentUser;
      setUser(myUser);
    },
    onError(error) {
      processGraphqlErrors({ error, setIsShown, setMessage, setType });
    },
  });

  useEffect(() => {
    makeQuery();
  }, []);

  return {
    loading,
    error,
  };
};

export default useUser;
