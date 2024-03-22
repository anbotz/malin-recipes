"use client";
import * as React from "react";
import Link from "next/link";
import UserMenu from "./user-menu";
import { useAuthSession } from "@/hooks/use-auth-session";
import CookSvg from "./icons/cook";
import { Kitchen, Add } from "@/_components/icons";
import HomeSvg from "./icons/home";
import BurgerMenuSvg from "./icons/burger-menu";

const Tab = ({
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
      <span className="hidden sm:block">{name}</span>
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

export default function AppBarComponent() {
  const { permissions } = useAuthSession();

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="dropdown sm:hidden">
        <div tabIndex={0} role="button" className="m-1">
          <BurgerMenuSvg />
        </div>
        <ul
          tabIndex={0}
          className="p-2 shadow menu dropdown-content z-50 bg-neutral rounded-box w-52"
        >
          <MenuItem href="/" icon={<HomeSvg />} name="Accueil" />

          <MenuItem href="/recipe" icon={<Kitchen />} name="Recettes" />
          <MenuItem href="/batch" icon={<CookSvg />} name="Batch" />
          {permissions.includes("RECIPE.CREATE") && (
            <MenuItem href="/create" icon={<Add />} name="Créer une recette" />
          )}
        </ul>
      </div>
      <div className="flex">
        <Link href="/" className="btn btn-ghost text-xl">
          MALIN RECIPE
        </Link>
      </div>
      <div className="flex-1">
        <ul className="menu menu-horizontal px-1 hidden sm:flex">
          <Tab href="/recipe" icon={<Kitchen />} name="RECETTES" />
          <Tab href="/batch" icon={<CookSvg />} name="BATCH" />
          {permissions.includes("RECIPE.CREATE") && (
            <Tab href="/create" icon={<Add />} />
          )}
        </ul>
      </div>
      <UserMenu />
    </div>
  );
}
