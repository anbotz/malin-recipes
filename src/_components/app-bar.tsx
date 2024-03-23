"use client";
import * as React from "react";
import Link from "next/link";
import UserMenu from "./user-menu";
import { useAuthSession } from "@/hooks/use-auth-session";
import CookSvg from "./icons/cook";
import { Kitchen, Add } from "@/_components/icons";
import HomeSvg from "./icons/home";
import BurgerMenuSvg from "./icons/burger-menu";
import { PERMISSIONS } from "@/lib/permission/const";
import NightMode from "./buttons/night-mode-button";

type MenuItem = {
  href: string;
  icon: JSX.Element;
  name: string;
  permission?: string;
};

const MENU_ITEMS: MenuItem[] = [
  { href: "/", icon: <HomeSvg />, name: "Accueil" },
  { href: "/recipe", icon: <Kitchen />, name: "Recettes" },
  { href: "/batch", icon: <CookSvg />, name: "Batch" },
  {
    href: "/create",
    icon: <Add />,
    name: "Créer une recette",
    permission: PERMISSIONS.RECIPE.CREATE,
  },
];

const hasPermission = (menuItem: MenuItem, permissions: string[]): boolean => {
  if (menuItem.permission) {
    return permissions.includes(menuItem.permission);
  }
  return true;
};

const Tab = ({
  href,
  name,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
  name?: string;
}) => (
  <li title={name}>
    <Link href={href}>
      {icon}
      {icon && name && " "}
      <span className="hidden lg:block">{name}</span>
    </Link>
  </li>
);

const MenuItem = ({
  href,
  name,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
  name?: string;
}) => (
  <li>
    <Link href={href}>
      {icon}
      {icon && name && " "}
      <span>{name}</span>
    </Link>
  </li>
);

const MobileMenu = ({ menuEntries }: { menuEntries: MenuItem[] }) => {
  return (
    <div className="dropdown sm:hidden">
      <div tabIndex={0} role="button" className="m-1">
        <BurgerMenuSvg />
      </div>
      <ul
        tabIndex={0}
        className="p-2 shadow menu dropdown-content z-50 bg-neutral rounded-box w-52"
      >
        {menuEntries.map((e: MenuItem) => {
          const { href, icon, name } = e;
          return <MenuItem key={e.name} {...{ href, icon, name }} />;
        })}
      </ul>
    </div>
  );
};

const BrowserMenu = ({ menuEntries }: { menuEntries: MenuItem[] }) => {
  const menuEntriesWithoutHome = menuEntries.filter(
    (e) => e.name !== "Accueil"
  );
  return (
    <ul className="menu menu-horizontal px-1 hidden sm:flex">
      {menuEntriesWithoutHome.map((e) => {
        const { href, icon, name } = e;
        return <Tab key={e.name} {...{ href, icon, name }} />;
      })}
    </ul>
  );
};

export default function AppBarComponent() {
  const { permissions } = useAuthSession();

  const menuEntries = MENU_ITEMS.filter((item) =>
    hasPermission(item, permissions)
  );

  return (
    <div className="navbar sticky top-0 z-50 bg-neutral text-neutral-content">
      <MobileMenu menuEntries={menuEntries} />
      <div className="flex">
        <Link href="/" className="btn btn-ghost text-xl">
          MALIN RECIPE
        </Link>
      </div>
      <BrowserMenu menuEntries={menuEntries} />
      <div className="flex-1" />
      <NightMode />
      <UserMenu />
    </div>
  );
}
