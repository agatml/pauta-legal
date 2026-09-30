import {
  FLUXO_STATUS,
  type Diligencia,
  type Processo,
  type StatusDiligencia,
} from "@/data/mockData";

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatarDataHora(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR");
}

/** Dias até a data (negativo = passado). */
export function diasAte(iso: string): number {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const alvo = new Date(iso);
  alvo.setHours(0, 0, 0, 0);
  return Math.round((alvo.getTime() - hoje.getTime()) / 86_400_000);
}

export function ehUrgente(d: Diligencia): boolean {
  const dias = diasAte(d.data);
  return (
    dias >= 0 &&
    dias <= 3 &&
    d.status !== "Cancelada" &&
    d.status !== "Concluída"
  );
}

export function proximoStatus(
  status: StatusDiligencia,
): StatusDiligencia | null {
  const i = FLUXO_STATUS.indexOf(status);
  if (i === -1 || i === FLUXO_STATUS.length - 1) return null;
  return FLUXO_STATUS[i + 1];
}

export function podeCancelar(status: StatusDiligencia): boolean {
  return status !== "Cancelada" && status !== "Concluída";
}

export function processoDe(
  lista: Processo[],
  processoId: string,
): Processo | undefined {
  return lista.find((p) => p.id === processoId);
}
