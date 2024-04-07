import { UserContext } from "@/providers/User";
import { useContext } from "react";
// { name: userName }: Pick<User, "name">
const Dashboard = () => {
  const { user } = useContext(UserContext);
  if (!user) return null;
  return (
    <>
      <main>{user.name}</main>
      <footer>footer</footer>
    </>
  );
};

export default Dashboard;
