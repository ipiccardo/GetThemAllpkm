import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./nav.module.css";

const NavLinks = () => {
  const pathName = usePathname();

  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Catched",
      href: "/catched",
    },
  ];

  return (
    <>
      <ul className={styles.navBar}>
        {links.map((link) => {
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${pathName === link.href ? styles.links : ""}`}
              >
                <p>{link.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default NavLinks;
