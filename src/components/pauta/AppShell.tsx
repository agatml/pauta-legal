import { Link } from "@tanstack/react-router";
import { CalendarClock, FolderOpen, LayoutDashboard, LogOut, Menu, Scale } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItens = [
  { to: "/", label: "Painel", icon: LayoutDashboard },
  { to: "/diligencias", label: "Diligências", icon: CalendarClock },
  { to: "/processos", label: "Processos", icon: FolderOpen },
] as const;

function Marca() {
  return (
    <Link
      to="/"
      aria-label="Ir para o Painel"
      className="flex items-center gap-2.5 rounded-lg"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
        <Scale className="size-5" />
      </span>
      <span>
        <span className="block font-display text-lg leading-none text-primary-foreground">
          Pauta
        </span>
        <span className="block text-[11px] text-primary-foreground/70">
          Audiências e diligências
        </span>
      </span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {navItens.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-foreground/75 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          activeProps={{
            className: "bg-primary-foreground/15 text-primary-foreground",
          }}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function AppShell({
  titulo,
  descricao,
  acao,
  children,
}: {
  titulo: string;
  descricao?: string;
  acao?: ReactNode;
  children: ReactNode;
}) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-primary px-4 py-6 lg:flex">
        <Marca />
        <div className="mt-8 flex-1">
          <NavLinks />
        </div>
        <Link
          to="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <LogOut className="size-4" />
          Sair
        </Link>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 bg-primary lg:bg-card lg:shadow-[0_1px_2px_oklch(0_0_0/0.06)]">
          <div className="flex items-center gap-3 px-4 py-4 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Abrir menu"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              onClick={() => setMenuAberto((v) => !v)}
            >
              <Menu className="size-5" />
            </Button>
            <Marca />
          </div>
          {menuAberto && (
            <div className="border-t border-primary-foreground/10 px-4 pb-4 lg:hidden">
              <NavLinks onNavigate={() => setMenuAberto(false)} />
            </div>
          )}

          <div className="hidden items-end justify-between gap-4 px-8 py-5 lg:flex">
            <div>
              <h1 className="font-display text-2xl text-foreground">{titulo}</h1>
              {descricao && (
                <p className="mt-1 text-sm text-muted-foreground">{descricao}</p>
              )}
            </div>
            {acao}
          </div>
        </header>

        <main className={cn("px-4 py-6 lg:px-8 lg:py-8")}>
          <div className="mb-5 lg:hidden">
            <h1 className="font-display text-xl text-foreground">{titulo}</h1>
            {descricao && (
              <p className="mt-1 text-sm text-muted-foreground">{descricao}</p>
            )}
            {acao && <div className="mt-4">{acao}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
