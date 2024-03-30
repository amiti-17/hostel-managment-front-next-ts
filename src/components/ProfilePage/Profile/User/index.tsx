import { CiUser } from "react-icons/ci";
import { User } from "@/generated/types";

type UserComponentProps = {
  user: User;
};

const UserComponent = ({ user }: UserComponentProps) => {
  return (
    <div>
      <CiUser />
      <>{user.name}</>
      <button>Settings</button>
    </div>
  );
};

export default UserComponent;
