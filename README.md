# Pauta Legal

Crie um protótipo de aplicação web chamada "Pauta", em português do Brasil: um gestor de audiências e diligências jurídicas para advogados e escritórios.

IMPORTANTE: nesta etapa NÃO use backend, banco de dados nem autenticação real. Use dados fictícios fixos em um arquivo separado (por exemplo, src/data/mockData.ts), com tipos TypeScript bem definidos, para que depois seja fácil trocar pelos dados de um banco.

MODELO DE DADOS (fictício):

- Processo: id, numero (formato fictício, ex.: 0000123-45.2025.8.26.0100), tribunal, cliente.

- Diligência: id, processoId, tipo (Audiência, Diligência externa, Cálculo, Protocolo), data, local, valor, responsavel, status.

- Status possíveis: Solicitada, Aceita, Realizada, Concluída, Cancelada.

Crie 5 processos e cerca de 12 diligências de exemplo, com datas variadas (algumas próximas, algumas passadas). Use apenas nomes e números inventados.

TELAS (com navegação lateral no desktop e menu compacto no celular):

1. PAINEL: cards com o total de diligências por status; lista das próximas 5 diligências por data; destaque visual para as que ocorrem em até 3 dias.

2. DILIGÊNCIAS: tabela com colunas tipo, processo, data, local, valor e status (badge colorido). Filtros por status, tipo e período, além de busca por número do processo ou cliente. Botão "Nova diligência" abrindo um modal com formulário (validação: tipo, processo e data obrigatórios). No modal ou na tabela, permitir alterar o status seguindo a ordem Solicitada → Aceita → Realizada → Concluída, com opção de cancelar.

3. PROCESSOS: lista de processos; ao clicar em um, mostrar as diligências vinculadas a ele.

4. LOGIN: tela apenas visual (e-mail e senha), sem funcionalidade real; o botão "Entrar" leva ao Painel.

DESIGN:

- Visual profissional e sóbrio, adequado ao meio jurídico. Cor principal azul-marinho (#1E3A8A) com destaque em verde-água (#0D9488). Fundo cinza muito claro (#F8FAFC), cards brancos, cantos arredondados e sombras leves.

- Badges de status com cores distintas e boa legibilidade.

- Responsivo: tabela vira lista de cards no celular.

- Sem modo escuro nesta etapa.

REGRAS:

- Mantenha o código organizado em componentes separados e reutilizáveis.

- Não altere nem invente funcionalidades além das descritas.

- Mensagens amigáveis quando não houver resultados nos filtros.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c7dd1ab7-6710-5aa4-9504-7f62fee07146).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
