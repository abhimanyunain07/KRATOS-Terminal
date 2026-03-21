import { PageHeader } from "@/components/layout/page-header";
import { BqlPanel } from "@/components/panels/bql-panel";
import { SavedQueriesPanel } from "@/components/panels/saved-queries-panel";

export default async function PbqlPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="PBQL"
        title="Query workbench"
        description="Bloomberg-style query input for server-side aggregation across the prediction-market universe."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_0.38fr]">
        <BqlPanel initialQuery={params.query} />
        <SavedQueriesPanel />
      </div>
    </div>
  );
}
