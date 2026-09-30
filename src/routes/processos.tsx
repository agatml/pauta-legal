import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/pauta/AppShell";
import { DiligenciasList } from "@/components/pauta/DiligenciasList";
import { EmptyState } from "@/components/pauta/EmptyState";
import { usePauta } from "@/components/pauta/PautaProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/processos")({
  head: () => ({
    meta: [
      { title: "Processos — Pauta" },
      {
        name: "description",
        content:
          "Consulte os processos do escritório e as diligências vinculadas a cada um deles.",
      },
      { property: "og:title", content: "Processos — Pauta" },
      {
        property: "og:description",
        content:
          "Consulte os processos e as diligências vinculadas a cada um deles.",
      },
    ],
  }),
  component: Processos,
});

function Processos() {
  const { processos, diligencias } = usePauta();
  const [selecionado, setSelecionado] = useState<string | null>(
    processos[0]?.id ?? null,
  );

  const processo = processos.find((p) => p.id === selecionado);
  const vinculadas = diligencias
    .filter((d) => d.processoId === selecionado)
    .sort((a, b) => a.data.localeCompare(b.data));

  return (
    <AppShell
      titulo="Processos"
      descricao="Selecione um processo para ver suas diligências."
    >
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <ul className="flex flex-col gap-3">
          {processos.map((p) => {
            const total = diligencias.filter((d) => d.processoId === p.id).length;
            const ativo = p.id === selecionado;
            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setSelecionado(p.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl bg-card p-4 text-left shadow-card transition-colors hover:bg-accent/50",
                    ativo && "ring-2 ring-brand",
                  )}
                >
                  <span>
                    <span className="block font-medium text-foreground">
                      {p.numero}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {p.cliente}
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      {p.tribunal} · {total}{" "}
                      {total === 1 ? "diligência" : "diligências"}
                    </span>
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </button>
              </li>
            );
          })}
        </ul>

        <div>
          {!processo ? (
            <EmptyState
              titulo="Nenhum processo selecionado"
              descricao="Escolha um processo na lista ao lado para ver as diligências vinculadas."
            />
          ) : (
            <>
              <div className="rounded-xl bg-card p-4 shadow-card">
                <h2 className="font-display text-lg text-foreground">
                  {processo.numero}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {processo.cliente} · {processo.tribunal}
                </p>
              </div>
              <div className="mt-4">
                {vinculadas.length === 0 ? (
                  <EmptyState
                    titulo="Sem diligências neste processo"
                    descricao="Este processo ainda não possui diligências cadastradas."
                  />
                ) : (
                  <DiligenciasList itens={vinculadas} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
