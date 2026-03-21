import { getDeployReadinessReport } from "@/lib/deploy-readiness";
import { getRuntimeStatus } from "@/lib/runtime-status";

export function getDeepHealthReport() {
  const runtime = getRuntimeStatus();
  const deploy = getDeployReadinessReport();

  return {
    timestamp: new Date().toISOString(),
    runtime,
    deploy,
    summary: {
      runtimeServices: runtime.services.length,
      deployReadyCount: deploy.readyCount,
      deployTotalCount: deploy.totalCount,
      tradeRoutingEnabled: runtime.tradeRoutingEnabled,
      authEnabled: runtime.authEnabled,
    },
  };
}

