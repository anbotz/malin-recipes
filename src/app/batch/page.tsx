import { BatchButtons } from "@/_components/buttons/batch-buttons";
import BatchGrid from "@/_components/container/batch-grid";
import ProtectedContentContainer from "@/_components/container/protected-content-container";
import { PageLayoutComponent } from "@/_components/layout/page-layout";
import { authOptions } from "@/lib/auth-options";
import batchService from "@/lib/batch/service";
import { getServerSession } from "next-auth";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const BatchPage = async () => {
  const data = await getServerSession(authOptions);
  const batch = await batchService.getUserBatch(data?.user.id, days.length);

  return (
    <PageLayoutComponent title="Batch">
      <ProtectedContentContainer>
        {batch && batch?.length > 0 && <BatchGrid days={days} batch={batch} />}
        <BatchButtons size={days.length} />
      </ProtectedContentContainer>
    </PageLayoutComponent>
  );
};

export default BatchPage;
