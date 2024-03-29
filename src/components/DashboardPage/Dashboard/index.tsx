import { User } from "@/generated/types";

type DashboardProps = {
  user: User;
};

const Dashboard = ({ user }: DashboardProps) => {
  return (
    <>
      <nav>nav</nav>
      <main>{user.name}</main>
      <footer>footer</footer>
    </>
  );
};

export default Dashboard;
