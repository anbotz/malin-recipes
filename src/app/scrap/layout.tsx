import ProtectedContentContainer from "@/_components/container/protected-content-container";
import { PERMISSIONS } from "@/lib/permission/const";

const {
  RECIPE: { SCRAP },
} = PERMISSIONS;

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const requiredPermissions = [SCRAP];

  return (
    <ProtectedContentContainer requiredPermissions={requiredPermissions}>
      {children}
    </ProtectedContentContainer>
  );
};
export default ProtectedLayout;
