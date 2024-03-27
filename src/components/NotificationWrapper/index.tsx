import { ReactNode } from "react";
import { NotificationGroup } from "@progress/kendo-react-notification";
import NotificationComponent from "./notificationComponent";
import NotificationProvider from "./NotificationProvider";

const NotificationWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <NotificationProvider>
      {children}
      <NotificationGroup
        style={{
          right: 0,
          bottom: 0,
          alignItems: "flex-start",
          flexWrap: "wrap-reverse",
        }}
      >
        <NotificationComponent />
      </NotificationGroup>
    </NotificationProvider>
  );
};

export default NotificationWrapper;
