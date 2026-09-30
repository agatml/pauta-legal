import type { StatusDiligencia } from "@/data/mockData";
import { cn } from "@/lib/utils";

const estilos: Record<StatusDiligencia, string> = {
  Solicitada: "bg-status-solicitada-soft text-status-solicitada",
  Aceita: "bg-status-aceita-soft text-status-aceita",
  Realizada: "bg-status-realizada-soft text-status-realizada",
  Concluída: "bg-status-concluida-soft text-status-concluida",
  Cancelada: "bg-status-cancelada-soft text-status-cancelada",
};

export function StatusBadge({
  status,
  className,
}: {
  status: StatusDiligencia;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        estilos[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
