import GeneralLoginLayout from "@/components/GeneralLoginLayout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <GeneralLoginLayout>{children}</GeneralLoginLayout>;
};

export default Layout;
