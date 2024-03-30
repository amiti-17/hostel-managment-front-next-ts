"use client";

import useUser from "@/Hooks/useUser";
import GeneralPageLayout from "../GeneralPageLayout";
import Dashboard from "./Dashboard";
import { UserContext } from "@/providers/User";
import { useContext } from "react";

const DashboardWrapper = () => {
  const { user, setUser } = useContext(UserContext);
  /*const {} = */ useUser({ user, setUser });
  return (
    <GeneralPageLayout>
      <Dashboard />
    </GeneralPageLayout>
  );
};

export default DashboardWrapper;
