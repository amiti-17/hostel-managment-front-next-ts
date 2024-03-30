"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathName = usePathname();
  return (
    <div>
      <h1>Not found ({pathName}) – 404! </h1>
      <div>
        <Link href="/">Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
