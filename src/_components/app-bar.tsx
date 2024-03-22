"use client";
import * as React from "react";
import Link from "next/link";
import UserMenu from "./user-menu";
import { useAuthSession } from "@/hooks/use-auth-session";
import CookSvg from "./icons/cook";
import { Kitchen, Add } from "@/_components/icons";

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

export default function AppBarComponent() {
  const { permissions } = useAuthSession();

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex">
        <Link href="/" className="btn btn-ghost text-xl">
          MALIN RECIPE
        </Link>
      </div>
      <div className="flex-1">
        <ul className="menu menu-horizontal px-1">
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
