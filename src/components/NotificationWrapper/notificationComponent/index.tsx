import { useContext, useEffect } from "react";
import { Fade } from "@progress/kendo-react-animation";
import { Notification } from "@progress/kendo-react-notification";
import { NotificationContext } from "@/components/NotificationWrapper/NotificationProvider";

const NotificationComponent = () => {
  const { isShown, setIsShown, message, setMessage, type, setType } =
    useContext(NotificationContext);
  useEffect(() => {
    if (isShown) {
      if (!message) {
        setIsShown(false);
      }
      setTimeout(() => {
        setIsShown(false);
      }, 3000);
    }
  }, [isShown, setIsShown, setMessage, setType]);

  return (
    <Fade>
      {isShown && (
        <Notification
          type={{
            style: type,
            icon: true,
          }}
          closable={true}
          onClose={() => setIsShown(false)}
        >
          <span>{message}</span>
        </Notification>
      )}
    </Fade>
  );
};

export default NotificationComponent;
