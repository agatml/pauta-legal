import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/pauta/AppShell";
import { EmptyState } from "@/components/pauta/EmptyState";
import { StatusBadge } from "@/components/pauta/StatusBadge";
import { usePauta } from "@/components/pauta/PautaProvider";
import { STATUS_LIST } from "@/data/mockData";
import { diasAte, ehUrgente, formatarDataHora, formatarMoeda } from "@/lib/pauta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel — Pauta | Audiências e diligências jurídicas" },
      {
        name: "description",
        content:
          "Painel do Pauta: acompanhe diligências por status e as próximas audiências do escritório.",
      },
      { property: "og:title", content: "Painel — Pauta" },
      {
        property: "og:description",
        content:
          "Acompanhe diligências por status e as próximas audiências do escritório.",
      },
    ],
  }),
  component: Painel,
});

function Painel() {
  const { diligencias, processos } = usePauta();

  const totaisPorStatus = STATUS_LIST.map((status) => ({
    status,
    total: diligencias.filter((d) => d.status === status).length,
  }));

  const proximas = [...diligencias]
    .filter((d) => d.status !== "Cancelada")
    .sort((a, b) => a.data.localeCompare(b.data))
    .filter((d) => diasAte(d.data) >= 0)
    .slice(0, 5);

  return (
    <AppShell
      titulo="Painel"
      descricao="Visão geral das diligências do escritório."
    >
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {totaisPorStatus.map(({ status, total }) => (
          <div key={status} className="rounded-xl bg-card p-4 shadow-card">
            <StatusBadge status={status} />
            <p className="mt-3 font-display text-3xl text-foreground">{total}</p>
            <p className="text-xs text-muted-foreground">
              {total === 1 ? "diligência" : "diligências"}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-lg text-foreground">
            Próximas diligências
          </h2>
          <Link
            to="/diligencias"
            className="text-sm font-medium text-accent-foreground hover:underline"
          >
            Ver todas
          </Link>
        </div>

        <div className="mt-4">
          {proximas.length === 0 ? (
            <EmptyState
              titulo="Nenhuma diligência futura"
              descricao="Quando houver diligências agendadas, elas aparecem aqui em ordem de data."
            />
          ) : (
            <ul className="flex flex-col gap-3">
              {proximas.map((d) => {
                const processo = processos.find((p) => p.id === d.processoId);
                const urgente = ehUrgente(d);
                const dias = diasAte(d.data);
                return (
                  <li
                    key={d.id}
                    className={cn(
                      "rounded-xl bg-card p-4 shadow-card sm:flex sm:items-center sm:justify-between sm:gap-4",
                      urgente && "border-l-4 border-brand bg-accent/40",
                    )}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-base text-foreground">
                          {d.tipo}
                        </h3>
                        <StatusBadge status={d.status} />
                        {urgente && (
                          <span className="rounded-full bg-brand px-2 py-0.5 text-[11px] font-semibold text-brand-foreground">
                            {dias === 0 ? "hoje" : `em ${dias} dia${dias > 1 ? "s" : ""}`}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {processo?.numero} · {processo?.cliente}
                      </p>
                      <p className="text-sm text-muted-foreground">{d.local}</p>
                    </div>
                    <div className="mt-3 text-sm sm:mt-0 sm:text-right">
                      <p className="font-medium text-foreground">
                        {formatarDataHora(d.data)}
                      </p>
                      <p className="text-muted-foreground">
                        {formatarMoeda(d.valor)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {d.responsavel}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </AppShell>
  );
}
