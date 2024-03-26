import ProtectedContentContainer from "@/_components/container/protected-content-container";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  return <ProtectedContentContainer>{children}</ProtectedContentContainer>;
};
export default ProtectedLayout;
