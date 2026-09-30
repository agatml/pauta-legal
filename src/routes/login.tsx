import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Pauta" },
      {
        name: "description",
        content:
          "Acesse o Pauta, o gestor de audiências e diligências jurídicas do seu escritório.",
      },
      { property: "og:title", content: "Entrar — Pauta" },
      {
        property: "og:description",
        content: "Acesse o gestor de audiências e diligências do seu escritório.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary px-4 py-12">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-brand-foreground">
          <Scale className="size-6" />
        </span>
        <span>
          <span className="block font-display text-2xl text-primary-foreground">
            Pauta
          </span>
          <span className="block text-xs text-primary-foreground/70">
            Audiências e diligências jurídicas
          </span>
        </span>
      </div>

      <div className="w-full max-w-sm rounded-2xl bg-card p-6 shadow-raised">
        <h1 className="font-display text-xl text-foreground">Entrar</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acesse a pauta do seu escritório.
        </p>

        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="nome@escritorio.adv.br"
              autoComplete="email"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <Button variant="accent" className="mt-2 w-full" asChild>
            <Link to="/">Entrar</Link>
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Protótipo visual — nenhum dado é enviado.
        </p>
      </div>
    </div>
  );
}
