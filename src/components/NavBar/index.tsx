import Link from "next/link";
import { usePathname } from "next/navigation";
import LinkComponent from "./LinkComponent";
import style from "./style.module.css";

type NavBarProps = {};

type CurrentPageStr =
  | "dashboard"
  | "profile"
  | "tasks"
  | "schedule"
  | "statistics"
  | "map";

const NavBar = ({}: NavBarProps) => {
  const allPages: CurrentPageStr[] = [
    "dashboard",
    "profile",
    "tasks",
    "schedule",
    "statistics",
    "map",
  ];
  return (
    <nav className={style.nav}>
      {allPages.map((page) => (
        <LinkComponent key={page} name={page} />
      ))}
    </nav>
  );
};

export default NavBar;
