import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIPOS_LIST, type TipoDiligencia } from "@/data/mockData";
import { usePauta } from "./PautaProvider";

interface Erros {
  tipo?: string;
  processoId?: string;
  data?: string;
}

export function NovaDiligenciaDialog({
  processoIdInicial,
}: {
  processoIdInicial?: string;
}) {
  const { processos, criarDiligencia } = usePauta();
  const [aberto, setAberto] = useState(false);
  const [tipo, setTipo] = useState<TipoDiligencia | "">("");
  const [processoId, setProcessoId] = useState(processoIdInicial ?? "");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");
  const [valor, setValor] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [erros, setErros] = useState<Erros>({});

  function limpar() {
    setTipo("");
    setProcessoId(processoIdInicial ?? "");
    setData("");
    setLocal("");
    setValor("");
    setResponsavel("");
    setErros({});
  }

  function salvar() {
    const novosErros: Erros = {};
    if (!tipo) novosErros.tipo = "Selecione o tipo da diligência.";
    if (!processoId) novosErros.processoId = "Selecione o processo.";
    if (!data) novosErros.data = "Informe a data.";
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    criarDiligencia({
      tipo: tipo as TipoDiligencia,
      processoId,
      data,
      local: local.trim() || "A definir",
      valor: Number(valor.replace(",", ".")) || 0,
      responsavel: responsavel.trim() || "A definir",
    });
    limpar();
    setAberto(false);
  }

  return (
    <Dialog
      open={aberto}
      onOpenChange={(v) => {
        setAberto(v);
        if (!v) limpar();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="accent">Nova diligência</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Nova diligência</DialogTitle>
          <DialogDescription>
            Cadastre a diligência. Ela entra com o status “Solicitada”.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Tipo *</Label>
            <Select value={tipo} onValueChange={(v) => setTipo(v as TipoDiligencia)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {TIPOS_LIST.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {erros.tipo && (
              <p className="text-xs text-destructive">{erros.tipo}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Processo *</Label>
            <Select value={processoId} onValueChange={setProcessoId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o processo" />
              </SelectTrigger>
              <SelectContent>
                {processos.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.numero} — {p.cliente}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {erros.processoId && (
              <p className="text-xs text-destructive">{erros.processoId}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="data">Data e hora *</Label>
            <Input
              id="data"
              type="datetime-local"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            {erros.data && (
              <p className="text-xs text-destructive">{erros.data}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="local">Local</Label>
            <Input
              id="local"
              value={local}
              placeholder="Fórum, endereço ou remoto"
              onChange={(e) => setLocal(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                inputMode="decimal"
                value={valor}
                placeholder="0,00"
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                value={responsavel}
                placeholder="Nome do responsável"
                onChange={(e) => setResponsavel(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setAberto(false)}>
            Cancelar
          </Button>
          <Button variant="accent" onClick={salvar}>
            Salvar diligência
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
