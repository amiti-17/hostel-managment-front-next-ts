import NavBar from "@/components/NavBar";
import { User } from "@/generated/types";
// { name: userName }: Pick<User, "name">
const Dashboard = () => {
  console.log();
  return (
    <>
      <main>{"userName"}</main>
      <footer>footer</footer>
    </>
  );
};

export default Dashboard;
