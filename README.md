# Fluxora AI — Landing Page

Landing page futurística para venda de automação de tarefas com IA.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** com tema escuro futurístico
- **Framer Motion** para animações
- **Supabase** para banco de dados (formulário de contato)
- **n8n** integração via webhooks

## Funcionalidades

- Design futurístico com glassmorphism, gradientes e animações
- Hero section com stats e CTAs
- Seção de recursos/features
- Como funciona (4 etapas)
- Planos e preços
- Formulário de contato (salva no Supabase + dispara webhook n8n)
- Chatbot widget (integra com n8n para respostas automáticas)

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Variáveis de Ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon do Supabase |
| `N8N_WEBHOOK_URL` | Webhook n8n para notificar novos contatos |
| `N8N_CHAT_WEBHOOK_URL` | Webhook n8n para responder mensagens do chat |

## Banco de Dados (Supabase)

Crie a tabela `contacts` no Supabase:

```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON contacts FOR INSERT TO anon
  WITH CHECK (true);
```

## Integração n8n

### Formulário de Contato
Configure um webhook no n8n e coloque a URL em `N8N_WEBHOOK_URL`. Os dados recebidos:

```json
{
  "name": "João",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "company": "Empresa X",
  "message": "Quero saber mais",
  "source": "fluxora-landing-page",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Chatbot
Configure um webhook no n8n e coloque a URL em `N8N_CHAT_WEBHOOK_URL`. O webhook deve retornar `{ "reply": "sua resposta" }`.

## Deploy

```bash
npm run build
```

Deploy recomendado na [Vercel](https://vercel.com).
