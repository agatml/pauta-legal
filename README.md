# Pauta — Gestor de Audiências e Diligências

Protótipo de aplicação web para advogados e escritórios acompanharem **processos, audiências e diligências** em um só lugar, com painel de acompanhamento e fluxo de status.

> ⚠️ **Projeto de estudo / portfólio.** Todos os dados são **fictícios**. A aplicação não faz cálculos jurídicos nem substitui sistemas oficiais de acompanhamento processual.

**🔗 Demo:** `https://pauta-juridica-pro.lovable.app`

---

## 📌 Status do projeto

| Etapa | Descrição | Situação |
|---|---|---|
| 1 | Interface completa com dados fictícios (4 telas) | ✅ Concluída |
| 2 | Detalhe do processo com rota própria + logo como atalho | ✅ Concluída |
| 3 | Autenticação (cadastro, login, rotas protegidas) | 🔄 Em andamento |
| 4 | Banco de dados: processos e diligências com RLS | ⏳ Planejada |
| 5 | Status persistindo e painel com dados reais | ⏳ Planejada |
| 6 | Testes finais, publicação e documentação | ⏳ Planejada |

---

## ✨ Funcionalidades

- **Painel:** total de diligências por status, próximas 5 por data e destaque para as que ocorrem em até 3 dias.
- **Diligências:** tabela com filtros (status, tipo, período), busca por número do processo ou cliente e cadastro por modal com validação.
- **Fluxo de status:** Solicitada → Aceita → Realizada → Concluída, com opção de cancelar.
- **Processos:** lista de processos e página de detalhe com as diligências vinculadas.
- **Responsivo:** tabela vira lista de cards no celular, com menu compacto.
- **Formatos brasileiros:** datas em dd/mm/aaaa e valores em R$.

## 🖼️ Telas

| Painel | Diligências |
|---|---|
| `![Painel](docs/img/painel.png)` | `![Diligências](docs/img/diligencias.png)` |

| Processos | Detalhe do processo |
|---|---|
| `![Processos](docs/img/processos.png)` | `![Detalhe](docs/img/detalhe.png)` |

---

## 🗄️ Modelo de dados

```
perfis (1) ────< processos (1) ────< diligencias
```

| Tabela | Campos principais |
|---|---|
| **perfis** | id, nome, e-mail |
| **processos** | id, número, tribunal, cliente, criado_por |
| **diligencias** | id, processo_id, tipo, data, local, valor, responsável, status, criado_por |

**Relacionamento:** um processo possui várias diligências (1 para N).
**Status possíveis:** Solicitada, Aceita, Realizada, Concluída, Cancelada.
**Tipos:** Audiência, Diligência externa, Cálculo, Protocolo.

## 🔒 Segurança

- Dados **100% fictícios** (nomes, números de processo e clientes inventados), em respeito à LGPD.
- Autenticação por e-mail e senha e rotas protegidas *(em implementação)*.
- **RLS (Row Level Security)** planejada: cada usuário acessa apenas os próprios registros.
- Nenhuma chave, senha ou segredo versionado no repositório.

---

## 🛠️ Tecnologias

- **Lovable** — geração e iteração da aplicação por prompts
- **React + TypeScript + Tailwind CSS** — stack gerada pelo Lovable *(confirmar no `package.json`)*
- **Backend / banco de dados** — *(preencher: Lovable Cloud ou Supabase, conforme usado)*
- **GitHub** — controle de versão e documentação

## ▶️ Como rodar localmente

```bash
git clone URL_DO_REPOSITORIO
cd NOME_DA_PASTA
npm install
npm run dev
```


---

## 🧠 Processo de desenvolvimento

O projeto foi construído em ciclos de **prompt → teste → correção**, com registro de cada etapa.

| Nº | Prompt (resumo) | Resultado | Problema encontrado | Correção | Créditos |
|---|---|---|---|---|---|
| 1 | App completo com 4 telas, dados fictícios tipados e design responsivo | App gerado e navegável | Clique em processo sem efeito; logo sem link | Prompt 2 | 6,70 |
| 2 | Página de detalhe do processo com rota própria e logo como atalho ao Painel | Funcionou | — | — | 4,20 |
| 3 | Autenticação e proteção de rotas | Login implementado | Erro de validação de senha ("mínimo de 6 caracteres" mesmo com senha válida) | Correção planejada | `PREENCHER` |

### Boas práticas adotadas

- **Planejamento antes do prompt:** modelo de dados e telas definidos previamente.
- **Visual antes do backend:** layout validado com dados fictícios, deixando a integração com o banco para depois.
- **Dados em arquivo separado e tipado**, facilitando a troca por dados do banco.
- **Prompts agrupados por assunto**, com a instrução explícita de não alterar o que já funciona.
- **Etapas pequenas**, respeitando o limite de créditos e permitindo reverter com segurança.

### Aprendizados

- Mudanças que criam novas rotas ou mexem em vários arquivos consomem mais créditos que ajustes visuais.
- Prompts com sintoma + resultado esperado reduzem retrabalho.
- Testar tudo antes de enviar o próximo prompt evita gastar crédito com correções parciais.
- Mensagens de erro genéricas podem esconder a causa real; vale exibir o erro retornado pelo backend.

---

## 🗺️ Próximos passos

- [ ] Corrigir validação de senha no cadastro
- [ ] Criar tabelas `perfis`, `processos` e `diligencias` com RLS
- [ ] Substituir dados fictícios fixos por dados do banco
- [ ] Persistir mudanças de status
- [ ] Painel com métricas reais
- [ ] Testes finais e publicação

---

## 📄 Licença

Projeto de estudo, sem fins comerciais.
