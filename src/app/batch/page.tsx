import { BatchButtons } from "@/_components/buttons/batch-buttons";
import BatchGrid from "@/_components/container/batch-grid";
import ProtectedContentContainer from "@/_components/container/protected-content-container";
import { PageLayoutComponent } from "@/_components/layout/page-layout";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const BatchPage = () => {
  return (
    <PageLayoutComponent title="Batch">
      <ProtectedContentContainer>
        <BatchGrid days={days} />
        <BatchButtons />
      </ProtectedContentContainer>
    </PageLayoutComponent>
  );
};

export default BatchPage;
