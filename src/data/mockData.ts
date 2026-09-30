export type StatusDiligencia =
  | "Solicitada"
  | "Aceita"
  | "Realizada"
  | "Concluída"
  | "Cancelada";

export type TipoDiligencia =
  | "Audiência"
  | "Diligência externa"
  | "Cálculo"
  | "Protocolo";

export interface Processo {
  id: string;
  numero: string;
  tribunal: string;
  cliente: string;
}

export interface Diligencia {
  id: string;
  processoId: string;
  tipo: TipoDiligencia;
  /** Data e hora em formato ISO (ex.: 2026-10-02T14:30:00) */
  data: string;
  local: string;
  valor: number;
  responsavel: string;
  status: StatusDiligencia;
}

export const STATUS_LIST: StatusDiligencia[] = [
  "Solicitada",
  "Aceita",
  "Realizada",
  "Concluída",
  "Cancelada",
];

/** Ordem do fluxo: Solicitada → Aceita → Realizada → Concluída */
export const FLUXO_STATUS: StatusDiligencia[] = [
  "Solicitada",
  "Aceita",
  "Realizada",
  "Concluída",
];

export const TIPOS_LIST: TipoDiligencia[] = [
  "Audiência",
  "Diligência externa",
  "Cálculo",
  "Protocolo",
];

export const processos: Processo[] = [
  {
    id: "p1",
    numero: "0000123-45.2025.8.26.0100",
    tribunal: "TJSP — 3ª Vara Cível",
    cliente: "Marcela Andrade Ferraz",
  },
  {
    id: "p2",
    numero: "0004871-902026.8.19.0001",
    tribunal: "TJRJ — 1ª Vara de Família",
    cliente: "Construtora Vale Norte Ltda.",
  },
  {
    id: "p3",
    numero: "0007712-08.2025.5.02.0035",
    tribunal: "TRT-2 — 35ª Vara do Trabalho",
    cliente: "Otávio Bentes Camargo",
  },
  {
    id: "p4",
    numero: "0002094-63.2026.8.13.0024",
    tribunal: "TJMG — 9ª Vara Cível",
    cliente: "Padaria Serra Azul ME",
  },
  {
    id: "p5",
    numero: "0009356-77.2025.4.03.6100",
    tribunal: "TRF-3 — 6ª Vara Federal",
    cliente: "Inês Vilanova Prado",
  },
];

export const diligencias: Diligencia[] = [
  {
    id: "d1",
    processoId: "p1",
    tipo: "Audiência",
    data: "2026-10-01T14:30:00",
    local: "Fórum João Mendes Júnior — Sala 812, São Paulo/SP",
    valor: 850,
    responsavel: "Dra. Helena Brandão",
    status: "Aceita",
  },
  {
    id: "d2",
    processoId: "p2",
    tipo: "Protocolo",
    data: "2026-10-02T09:00:00",
    local: "Balcão eletrônico — TJRJ",
    valor: 180,
    responsavel: "Dr. Rafael Nogueira",
    status: "Solicitada",
  },
  {
    id: "d3",
    processoId: "p3",
    tipo: "Audiência",
    data: "2026-10-05T11:00:00",
    local: "Fórum Ruy Barbosa — Sala 4, São Paulo/SP",
    valor: 1200,
    responsavel: "Dra. Camila Tavares",
    status: "Aceita",
  },
  {
    id: "d4",
    processoId: "p4",
    tipo: "Diligência externa",
    data: "2026-10-08T15:00:00",
    local: "Rua das Acácias, 421 — Belo Horizonte/MG",
    valor: 620,
    responsavel: "Dr. Iuri Beltrão",
    status: "Solicitada",
  },
  {
    id: "d5",
    processoId: "p5",
    tipo: "Cálculo",
    data: "2026-10-14T10:00:00",
    local: "Remoto — escritório",
    valor: 430,
    responsavel: "Contadora Vânia Lopes",
    status: "Aceita",
  },
  {
    id: "d6",
    processoId: "p1",
    tipo: "Protocolo",
    data: "2026-10-20T13:00:00",
    local: "Balcão eletrônico — TJSP",
    valor: 150,
    responsavel: "Dr. Rafael Nogueira",
    status: "Solicitada",
  },
  {
    id: "d7",
    processoId: "p2",
    tipo: "Audiência",
    data: "2026-09-24T09:30:00",
    local: "Fórum Central — Sala 210, Rio de Janeiro/RJ",
    valor: 990,
    responsavel: "Dra. Helena Brandão",
    status: "Realizada",
  },
  {
    id: "d8",
    processoId: "p3",
    tipo: "Cálculo",
    data: "2026-09-18T16:00:00",
    local: "Remoto — escritório",
    valor: 380,
    responsavel: "Contadora Vânia Lopes",
    status: "Concluída",
  },
  {
    id: "d9",
    processoId: "p4",
    tipo: "Audiência",
    data: "2026-09-11T14:00:00",
    local: "Fórum Lafayette — Sala 601, Belo Horizonte/MG",
    valor: 1100,
    responsavel: "Dr. Iuri Beltrão",
    status: "Concluída",
  },
  {
    id: "d10",
    processoId: "p5",
    tipo: "Diligência externa",
    data: "2026-09-05T10:30:00",
    local: "Av. Paulista, 1900 — São Paulo/SP",
    valor: 700,
    responsavel: "Dra. Camila Tavares",
    status: "Cancelada",
  },
  {
    id: "d11",
    processoId: "p1",
    tipo: "Diligência externa",
    data: "2026-08-28T08:45:00",
    local: "Cartório do 5º Ofício — São Paulo/SP",
    valor: 560,
    responsavel: "Dr. Iuri Beltrão",
    status: "Concluída",
  },
  {
    id: "d12",
    processoId: "p2",
    tipo: "Cálculo",
    data: "2026-11-03T09:00:00",
    local: "Remoto — escritório",
    valor: 520,
    responsavel: "Contadora Vânia Lopes",
    status: "Solicitada",
  },
];
