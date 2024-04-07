import React, { ReactNode, SetStateAction, useState } from "react";

export type NotificationType =
  | "success"
  | "warning"
  | "none"
  | "error"
  | "info";

export type NotificationContextType = {
  isShown: boolean;
  setIsShown: React.Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<SetStateAction<string>>;
  type: NotificationType;
  setType: React.Dispatch<SetStateAction<NotificationType>>;
};

export const defaultNotificationContext: NotificationContextType = {
  isShown: false,
  setIsShown: () => {},
  message: "",
  setMessage: () => {},
  type: "none",
  setType: () => {},
};

export const NotificationContext = React.createContext<NotificationContextType>(
  defaultNotificationContext
);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("some message");
  const [type, setType] = useState<NotificationType>("none");
  return (
    <NotificationContext.Provider
      value={{ isShown, setIsShown, message, setMessage, type, setType }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
