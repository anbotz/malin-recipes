import ProtectedContentContainer from "@/_components/container/protected-content-container";
import { PageLayoutComponent } from "@/_components/layout/page-layout";

const BatchPage = () => {
  return (
    <PageLayoutComponent title="Batch">
      <ProtectedContentContainer>batch content</ProtectedContentContainer>
    </PageLayoutComponent>
  );
};

export default BatchPage;
