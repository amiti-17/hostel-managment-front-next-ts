import { UserContext } from "@/providers/User";
import UserComponent from "./User";
import UserDetails from "./UserDetails";
import { useContext } from "react";
import Separator from "@/components/Separator";
import style from "./style.module.css";

type ProfileProps = {
  // user: User;
};

const Profile = ({}: ProfileProps) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return null;
  }

  return (
    <>
      {user && (
        <div className={style.profileWrapper}>
          <UserComponent name={user.name} />
          {/* <Separator width={"2px"} height={"100%"} /> */}
          <UserDetails user={user} />
        </div>
      )}
    </>
  );
};

export default Profile;
