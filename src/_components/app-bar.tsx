"use client";
import * as React from "react";
import { Add, Kitchen, Microwave } from "@mui/icons-material";
import Link from "next/link";
import UserMenu from "./user-menu";
import { useAuthSession } from "@/hooks/use-auth-session";

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
              <Microwave /> BATCH
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
