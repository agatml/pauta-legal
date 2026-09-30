import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/pauta/AppShell";
import { DiligenciasList } from "@/components/pauta/DiligenciasList";
import { EmptyState } from "@/components/pauta/EmptyState";
import { NovaDiligenciaDialog } from "@/components/pauta/NovaDiligenciaDialog";
import { usePauta } from "@/components/pauta/PautaProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS_LIST, TIPOS_LIST } from "@/data/mockData";

export const Route = createFileRoute("/diligencias")({
  head: () => ({
    meta: [
      { title: "Diligências — Pauta" },
      {
        name: "description",
        content:
          "Filtre, busque e acompanhe o andamento de audiências, diligências externas, cálculos e protocolos.",
      },
      { property: "og:title", content: "Diligências — Pauta" },
      {
        property: "og:description",
        content:
          "Filtre, busque e acompanhe o andamento das diligências do escritório.",
      },
    ],
  }),
  component: Diligencias,
});

function Diligencias() {
  const { diligencias, processos } = usePauta();
  const [status, setStatus] = useState("todos");
  const [tipo, setTipo] = useState("todos");
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");
  const [busca, setBusca] = useState("");

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return [...diligencias]
      .filter((d) => {
        if (status !== "todos" && d.status !== status) return false;
        if (tipo !== "todos" && d.tipo !== tipo) return false;
        const dia = d.data.slice(0, 10);
        if (de && dia < de) return false;
        if (ate && dia > ate) return false;
        if (termo) {
          const p = processos.find((x) => x.id === d.processoId);
          const alvo = `${p?.numero ?? ""} ${p?.cliente ?? ""}`.toLowerCase();
          if (!alvo.includes(termo)) return false;
        }
        return true;
      })
      .sort((a, b) => a.data.localeCompare(b.data));
  }, [diligencias, processos, status, tipo, de, ate, busca]);

  const limparFiltros =
    status !== "todos" || tipo !== "todos" || de || ate || busca.trim();

  return (
    <AppShell
      titulo="Diligências"
      descricao="Todas as diligências cadastradas, com filtros e fluxo de status."
      acao={<NovaDiligenciaDialog />}
    >
      <div className="rounded-xl bg-card p-4 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <div className="grid gap-1.5 lg:col-span-2">
            <Label htmlFor="busca">Buscar</Label>
            <Input
              id="busca"
              value={busca}
              placeholder="Número do processo ou cliente"
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                {STATUS_LIST.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label>Tipo</Label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                {TIPOS_LIST.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1.5">
              <Label htmlFor="de">De</Label>
              <Input
                id="de"
                type="date"
                value={de}
                onChange={(e) => setDe(e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="ate">Até</Label>
              <Input
                id="ate"
                type="date"
                value={ate}
                onChange={(e) => setAte(e.target.value)}
              />
            </div>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {filtradas.length} de {diligencias.length} diligências
        </p>
      </div>

      <div className="mt-6">
        {filtradas.length === 0 ? (
          <EmptyState
            titulo="Nenhuma diligência encontrada"
            descricao={
              limparFiltros
                ? "Tente ajustar os filtros ou buscar por outro número de processo ou cliente."
                : "Cadastre a primeira diligência usando o botão “Nova diligência”."
            }
          />
        ) : (
          <DiligenciasList itens={filtradas} />
        )}
      </div>
    </AppShell>
  );
}
