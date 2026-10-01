import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { AppShell } from "@/components/pauta/AppShell";
import { usePauta } from "@/components/pauta/PautaProvider";

export const Route = createFileRoute("/_authenticated/processos/")({
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

  return (
    <AppShell
      titulo="Processos"
      descricao="Selecione um processo para ver suas diligências."
    >
      <ul className="flex flex-col gap-3">
        {processos.map((p) => {
          const total = diligencias.filter((d) => d.processoId === p.id).length;
          return (
            <li key={p.id}>
              <Link
                to="/processos/$processoId"
                params={{ processoId: p.id }}
                className="flex w-full items-center justify-between gap-3 rounded-xl bg-card p-4 text-left shadow-card transition-colors hover:bg-accent/50 hover:ring-2 hover:ring-brand"
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
              </Link>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
