import { NotificationType } from "@/components/NotificationWrapper/NotificationProvider";
import { SetStateAction } from "react";

type IfNoCurrentUserFoundProps = {
  setIsShown: React.Dispatch<SetStateAction<boolean>>;
  setMessage: React.Dispatch<SetStateAction<string>>;
  setType: React.Dispatch<SetStateAction<NotificationType>>;
};

const ifNoCurrentUserFound = ({
  setMessage,
  setType,
  setIsShown,
}: IfNoCurrentUserFoundProps) => {
  setMessage("Users credentials was expired, please login again!");
  setType("warning");
  setIsShown(true);
};

export default ifNoCurrentUserFound;
