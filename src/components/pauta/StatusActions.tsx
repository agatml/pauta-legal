import { Button } from "@/components/ui/button";
import type { Diligencia } from "@/data/mockData";
import { podeCancelar, proximoStatus } from "@/lib/pauta";
import { usePauta } from "./PautaProvider";

export function StatusActions({ diligencia }: { diligencia: Diligencia }) {
  const { alterarStatus } = usePauta();
  const proximo = proximoStatus(diligencia.status);

  if (!proximo && !podeCancelar(diligencia.status)) {
    return <span className="text-xs text-muted-foreground">Sem ações</span>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {proximo && (
        <Button
          size="sm"
          variant="accent"
          onClick={() => alterarStatus(diligencia.id, proximo)}
        >
          Marcar como {proximo}
        </Button>
      )}
      {podeCancelar(diligencia.status) && (
        <Button
          size="sm"
          variant="ghost"
          className="text-status-cancelada hover:text-status-cancelada"
          onClick={() => alterarStatus(diligencia.id, "Cancelada")}
        >
          Cancelar
        </Button>
      )}
    </div>
  );
}
