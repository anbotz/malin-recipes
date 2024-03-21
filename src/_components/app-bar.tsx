"use client";
import * as React from "react";
import Link from "next/link";
import UserMenu from "./user-menu";
import { useAuthSession } from "@/hooks/use-auth-session";
import CookSvg from "./icons/cook";
import { Kitchen, Add } from "@/_components/icons";

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
          <li>
            <Link href="/recipe">
              <Kitchen /> RECETTES
            </Link>
          </li>
          <li>
            <Link href="/batch">
              <CookSvg /> BATCH
            </Link>
          </li>
          {permissions.includes("RECIPE.CREATE") && (
            <li>
              <Link href="/create">
                <Add />
              </Link>
            </li>
          )}
        </ul>
      </div>
      <UserMenu />
    </div>
  );
}
