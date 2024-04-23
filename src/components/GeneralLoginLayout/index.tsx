import CopyrightWrapper from "@/components/CopyrightBlock";

const GeneralLoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <>Maybe header? with logo?</>
      {children}
      <CopyrightWrapper />
    </>
  );
};

export default GeneralLoginLayout;
