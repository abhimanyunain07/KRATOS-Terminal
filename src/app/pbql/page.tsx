import { PageHeader } from "@/components/layout/page-header";
import { BqlPanel } from "@/components/panels/bql-panel";

export default function PbqlPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="PBQL"
        title="Query workbench"
        description="Bloomberg-style query input for server-side aggregation across the prediction-market universe."
      />
      <BqlPanel />
    </div>
  );
}

