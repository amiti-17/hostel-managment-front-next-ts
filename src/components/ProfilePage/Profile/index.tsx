import UserComponent from "./User";
import UserDetails from "./UserDetails";
import { User } from "@/generated/types";

type ProfileProps = {
  user: User;
};

const Profile = ({ user }: ProfileProps) => {
  // const router = useRouter();

  return (
    <>
      {user && (
        <>
          <UserComponent user={user} />
          <UserDetails />
        </>
      )}
    </>
  );
};

export default Profile;
