"use client";

import { ReactNode } from "react";
// import FillingUserProvider from "./FillingUserProvider";
import NavBar from "@/components/NavBar";

const GeneralPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <>{children}</>
    </>
  );
};

export default GeneralPageLayout;
