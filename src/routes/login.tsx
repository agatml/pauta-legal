import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

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

function traduzirErro(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed"))
    return "Confirme seu e-mail antes de entrar (verifique sua caixa de entrada).";
  if (m.includes("already registered") || m.includes("already been registered"))
    return "Este e-mail já possui uma conta.";
  if (m.includes("breach") || m.includes("pwned") || m.includes("compromised") || m.includes("leaked"))
    return "Essa senha apareceu em vazamentos de dados. Escolha outra, única e mais longa.";
  if (m.includes("weak") || m.includes("at least") || m.includes("too short"))
    return "A senha deve ter pelo menos 6 caracteres.";
  if (m.includes("invalid email") || m.includes("unable to validate email"))
    return "Informe um e-mail válido.";
  if (m.includes("password")) return "Senha inválida. Use pelo menos 6 caracteres.";
  return "Não foi possível concluir. Tente novamente.";
}

function Login() {
  const navigate = useNavigate();
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErro(null);
    setAviso(null);
    if (!email.trim() || !senha) {
      setErro("Informe e-mail e senha.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setEnviando(true);
    if (modo === "entrar") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
      setEnviando(false);
      if (error) return setErro(traduzirErro(error.message));
      navigate({ to: "/", replace: true });
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: { emailRedirectTo: window.location.origin },
      });
      setEnviando(false);
      if (error) return setErro(traduzirErro(error.message));
      if (data.session) {
        navigate({ to: "/", replace: true });
      } else {
        setAviso("Conta criada! Enviamos um link de confirmação para o seu e-mail.");
        setModo("entrar");
        setSenha("");
      }
    }
  }

  const criando = modo === "criar";

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
        <h1 className="font-display text-xl text-foreground">
          {criando ? "Criar conta" : "Entrar"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {criando
            ? "Cadastre-se para acessar a pauta do escritório."
            : "Acesse a pauta do seu escritório."}
        </p>

        <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
          <div className="grid gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="nome@escritorio.adv.br"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="senha">Senha</Label>
            <Input
              id="senha"
              type="password"
              placeholder="••••••••"
              autoComplete={criando ? "new-password" : "current-password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && (
            <p role="alert" className="text-sm text-destructive">
              {erro}
            </p>
          )}
          {aviso && (
            <p role="status" className="text-sm text-foreground">
              {aviso}
            </p>
          )}

          <Button type="submit" variant="accent" className="mt-2 w-full" disabled={enviando}>
            {enviando ? "Aguarde..." : criando ? "Criar conta" : "Entrar"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {criando ? "Já tem conta?" : "Ainda não tem conta?"}{" "}
          <button
            type="button"
            className="font-medium text-foreground underline-offset-4 hover:underline"
            onClick={() => {
              setModo(criando ? "entrar" : "criar");
              setErro(null);
              setAviso(null);
            }}
          >
            {criando ? "Entrar" : "Criar conta"}
          </button>
        </p>
      </div>
    </div>
  );
}
