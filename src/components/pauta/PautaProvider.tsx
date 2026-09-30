import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  diligencias as diligenciasMock,
  processos as processosMock,
  type Diligencia,
  type Processo,
  type StatusDiligencia,
} from "@/data/mockData";

export interface NovaDiligenciaInput {
  processoId: string;
  tipo: Diligencia["tipo"];
  data: string;
  local: string;
  valor: number;
  responsavel: string;
}

interface PautaContextValue {
  processos: Processo[];
  diligencias: Diligencia[];
  criarDiligencia: (input: NovaDiligenciaInput) => void;
  alterarStatus: (id: string, status: StatusDiligencia) => void;
}

const PautaContext = createContext<PautaContextValue | null>(null);

export function PautaProvider({ children }: { children: ReactNode }) {
  const [lista, setLista] = useState<Diligencia[]>(diligenciasMock);

  const value = useMemo<PautaContextValue>(
    () => ({
      processos: processosMock,
      diligencias: lista,
      criarDiligencia: (input) =>
        setLista((atual) => [
          ...atual,
          {
            id: `d-${Date.now()}`,
            status: "Solicitada",
            ...input,
          },
        ]),
      alterarStatus: (id, status) =>
        setLista((atual) =>
          atual.map((d) => (d.id === id ? { ...d, status } : d)),
        ),
    }),
    [lista],
  );

  return <PautaContext.Provider value={value}>{children}</PautaContext.Provider>;
}

export function usePauta(): PautaContextValue {
  const ctx = useContext(PautaContext);
  if (!ctx) throw new Error("usePauta precisa estar dentro de PautaProvider");
  return ctx;
}
