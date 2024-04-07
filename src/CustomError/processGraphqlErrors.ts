import { NotificationType } from "@/components/NotificationWrapper/NotificationProvider";
import { strConst } from "@/config/system/constants/strConst";
import { networkError } from "@/config/system/errors/graphqlErrors";
import { graphqlErrorsResponses } from "@/config/system/errors/graphqlErrorsResponses";
import { ApolloError } from "@apollo/client";
import { SetStateAction } from "react";

type ProcessGraphqlErrorsProps = {
  error: ApolloError;
  setIsShown: React.Dispatch<SetStateAction<boolean>>;
  setMessage: React.Dispatch<SetStateAction<string>>;
  setType: React.Dispatch<SetStateAction<NotificationType>>;
};

const processGraphqlErrors = ({
  error,
  setIsShown,
  setMessage,
  setType,
}: ProcessGraphqlErrorsProps) => {
  if (error.graphQLErrors[0]) {
    const currentError = error.graphQLErrors[0];
    switch (currentError.extensions.code) {
      case "UNAUTHENTICATED":
        setMessage("Probably you provided invalid credentials...");
        setType("error");
        setIsShown(true);
        break;
      default:
        setMessage(
          currentError.name + currentError.message ?? ": Some graphql error"
        );
        setType("error");
        setIsShown(true);
        break;
    }
    console.warn(currentError);
  }
  if (error.protocolErrors[0]) {
    const currentError = error.protocolErrors[0];
    console.warn(currentError);
    setMessage(
      currentError.message + (currentError.extensions ?? "") ??
        ": Some protocolErrors error"
    );
    setType("error");
    setIsShown(true);
  }
  if (error.clientErrors[0]) {
    const currentError = error.clientErrors[0];
    console.warn(currentError);
    setMessage(
      currentError.name +
        error.message +
        (error.stack ?? "") +
        (error.cause ?? "") +
        ": Some clientErrors error"
    );
    setType("error");
    setIsShown(true);
  }
  if (error.networkError) {
    if (
      error.networkError.message === networkError.message &&
      error.networkError.name === networkError.name
    ) {
      setMessage(graphqlErrorsResponses.networkError);
      setType("error");
      setIsShown(true);
      return;
    }
    console.warn(
      "name, ",
      error.networkError.name,
      "message, ",
      error.networkError.message,
      "cause, ",
      error.networkError.cause,
      "stack, ",
      error.networkError.stack
    );
    setMessage(
      (error?.message ?? "") +
        strConst.colonAndSpace +
        graphqlErrorsResponses.networkError
    );
    setType("error");
    setIsShown(true);
  }
};

export default processGraphqlErrors;
