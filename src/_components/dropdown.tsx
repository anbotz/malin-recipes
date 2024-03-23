import Link from "next/link";
import BurgerMenuSvg from "./icons/burger-menu";
import { MenuItem } from "./app-bar";

const MenuItem = ({
  href,
  name,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
  name?: string;
}) => (
  <Link href={href}>
    {icon}
    {icon && name && " "}
    <span>{name}</span>
  </Link>
);

const DropdownMenu = ({ menuEntries }: { menuEntries: MenuItem[] }) => {
  const handleClick = () => {
    const elem = document.activeElement as HTMLButtonElement;
    elem.blur();
  };

  return (
    <>
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
            return (
              <li key={e.name} onClick={handleClick}>
                <MenuItem {...{ href, icon, name }} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DropdownMenu;
