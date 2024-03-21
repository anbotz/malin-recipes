/* eslint-disable @next/next/no-img-element */
"use client";
import { User } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";

const settings = [{ title: "Déconnexion", onClick: () => signOut() }];

const Avatar = ({ user }: { user: User }) => {
  const name = user.name || undefined;
  const image = user?.image || undefined;

  return image ? (
    <div className="w-12 rounded-full">
      <img alt={name} src={image} />
    </div>
  ) : (
    <div className="bg-neutral text-neutral-content rounded-full w-12">
      <span className="text-3xl">{name?.charAt(0)}</span>
    </div>
  );
};

const UserMenu = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="tooltip" data-tip="Connexion">
        <button className="btn btn-primary" onClick={() => signIn()}>
          Connexion
        </button>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div className="tooltip tooltip-left" data-tip="Ouvrir le menu">
        <div tabIndex={0} role="button" className="avatar">
          <Avatar user={user} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {settings.map((setting: { title: string; onClick: () => void }) => (
          <li
            key={setting.title}
            onClick={() => {
              // handleCloseUserMenu();
              setting.onClick();
            }}
          >
            <a>{setting.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserMenu;
