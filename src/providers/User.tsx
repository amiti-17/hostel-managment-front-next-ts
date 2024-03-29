import React, { ReactNode, SetStateAction, useState } from "react";
import { User } from "@/generated/types";

export type UserContextType = {
  user: User | undefined;
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
};

export const defaultUserContext: UserContextType = {
  user: undefined,
  setUser: () => {},
};

export const UserContext =
  React.createContext<UserContextType>(defaultUserContext);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
