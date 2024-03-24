import { getAuthSession } from "@/lib/auth";
import SignInButton from "../buttons/signin-button";
import HomeButton from "../buttons/home-button";

const ProtectedContentContainer = async ({
  children,
  requiredPermissions,
}: {
  children: React.ReactNode;
  requiredPermissions?: string[];
}) => {
  const { user, permissions: userPermissions } = await getAuthSession();

  if (!user) {
    return (
      <div className="flex flex-col items-center grow justify-center">
        Il faut se connecter pour accéder à ce contenu
        <SignInButton />
      </div>
    );
  }

  if (
    requiredPermissions?.length &&
    requiredPermissions.some((req) => !userPermissions.includes(req))
  ) {
    return (
      <div className="flex flex-col items-center grow justify-center">
        Vous n&apos;avez pas les droits
        <HomeButton />
      </div>
    );
  }

  return <>{children}</>;
};
export default ProtectedContentContainer;
