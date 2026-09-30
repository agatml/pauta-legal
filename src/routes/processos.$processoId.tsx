import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/pauta/AppShell";
import { DiligenciasList } from "@/components/pauta/DiligenciasList";
import { EmptyState } from "@/components/pauta/EmptyState";
import { usePauta } from "@/components/pauta/PautaProvider";

export const Route = createFileRoute("/processos/$processoId")({
  head: () => ({
    meta: [
      { title: "Detalhe do processo — Pauta" },
      {
        name: "description",
        content:
          "Dados do processo e as diligências vinculadas a ele.",
      },
      { property: "og:title", content: "Detalhe do processo — Pauta" },
      {
        property: "og:description",
        content: "Dados do processo e as diligências vinculadas a ele.",
      },
    ],
  }),
  component: ProcessoDetalhe,
});

function BotaoVoltar() {
  return (
    <Link
      to="/processos"
      className="inline-flex items-center gap-2 rounded-lg border border-input bg-card px-4 py-2 text-sm font-medium text-foreground shadow-card transition-colors hover:bg-accent/50"
    >
      <ArrowLeft className="size-4" />
      Voltar para processos
    </Link>
  );
}

function ProcessoDetalhe() {
  const { processoId } = Route.useParams();
  const { processos, diligencias } = usePauta();

  const processo = processos.find((p) => p.id === processoId);
  const vinculadas = diligencias
    .filter((d) => d.processoId === processoId)
    .sort((a, b) => a.data.localeCompare(b.data));

  if (!processo) {
    return (
      <AppShell titulo="Processo não encontrado" acao={<BotaoVoltar />}>
        <EmptyState
          titulo="Processo não encontrado"
          descricao="Não encontramos este processo. Ele pode ter sido removido ou o endereço está incorreto."
        />
      </AppShell>
    );
  }

  return (
    <AppShell
      titulo={processo.numero}
      descricao="Detalhes do processo e suas diligências."
      acao={<BotaoVoltar />}
    >
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
    </AppShell>
  );
}
