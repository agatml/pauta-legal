import { SearchX } from "lucide-react";

export function EmptyState({
  titulo,
  descricao,
}: {
  titulo: string;
  descricao: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
        <SearchX className="size-5" />
      </span>
      <p className="mt-4 font-display text-base text-foreground">{titulo}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{descricao}</p>
    </div>
  );
}
