import { CalendarClock, MapPin, User } from "lucide-react";
import type { Diligencia } from "@/data/mockData";
import { ehUrgente, formatarDataHora, formatarMoeda } from "@/lib/pauta";
import { cn } from "@/lib/utils";
import { usePauta } from "./PautaProvider";
import { StatusActions } from "./StatusActions";
import { StatusBadge } from "./StatusBadge";

function useProcessoLookup() {
  const { processos } = usePauta();
  return (id: string) => processos.find((p) => p.id === id);
}

/** Tabela no desktop, lista de cards no celular. */
export function DiligenciasList({ itens }: { itens: Diligencia[] }) {
  const buscarProcesso = useProcessoLookup();

  return (
    <>
      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl bg-card shadow-card md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-semibold">Tipo</th>
              <th className="px-4 py-3 font-semibold">Processo</th>
              <th className="px-4 py-3 font-semibold">Data</th>
              <th className="px-4 py-3 font-semibold">Local</th>
              <th className="px-4 py-3 font-semibold">Valor</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {itens.map((d) => {
              const processo = buscarProcesso(d.processoId);
              return (
                <tr
                  key={d.id}
                  className={cn(
                    "border-b border-border/70 last:border-0 align-top",
                    ehUrgente(d) && "bg-accent/40",
                  )}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {d.tipo}
                    {ehUrgente(d) && (
                      <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold text-brand-foreground">
                        em breve
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="block font-medium text-foreground">
                      {processo?.numero}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {processo?.cliente}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {formatarDataHora(d.data)}
                  </td>
                  <td className="max-w-[220px] px-4 py-3 text-muted-foreground">
                    {d.local}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {formatarMoeda(d.valor)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusActions diligencia={d} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Celular */}
      <div className="flex flex-col gap-3 md:hidden">
        {itens.map((d) => {
          const processo = buscarProcesso(d.processoId);
          return (
            <article
              key={d.id}
              className={cn(
                "rounded-xl bg-card p-4 shadow-card",
                ehUrgente(d) && "ring-2 ring-brand",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base text-foreground">
                    {d.tipo}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {processo?.numero}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {processo?.cliente}
                  </p>
                </div>
                <StatusBadge status={d.status} />
              </div>

              <dl className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarClock className="size-4 shrink-0" />
                  {formatarDataHora(d.data)}
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  {d.local}
                </div>
                <div className="flex items-center gap-2">
                  <User className="size-4 shrink-0" />
                  {d.responsavel}
                </div>
              </dl>

              <p className="mt-3 font-semibold text-foreground">
                {formatarMoeda(d.valor)}
              </p>

              <div className="mt-3 border-t border-border pt-3">
                <StatusActions diligencia={d} />
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
