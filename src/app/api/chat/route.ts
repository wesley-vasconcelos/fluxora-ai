import { NextResponse } from "next/server";

interface ChatRequest {
  message: string;
  history?: { role: string; content: string }[];
}

const FAQ_RESPONSES: Record<string, string> = {
  preco:
    "Nossos planos começam em R$497/mês (Starter). O plano Pro é R$997/mês e o Enterprise é personalizado. Todos incluem 14 dias de teste gratuito!",
  plano:
    "Temos 3 planos: Starter (R$497/mês), Pro (R$997/mês) e Enterprise (sob consulta). Quer saber mais sobre algum deles?",
  servico:
    "Oferecemos automação de fluxos de trabalho, chatbots com IA, integração de sistemas, analytics avançado e agentes autônomos. Tudo personalizado para seu negócio.",
  funciona:
    "Nosso processo é simples: 1) Diagnóstico dos seus processos, 2) Configuração personalizada, 3) Implementação com testes, 4) Otimização contínua com IA.",
  integracao:
    "Integramos com mais de 500 apps: WhatsApp, Instagram, CRM, ERP, Google Workspace, Slack, e muitos mais!",
  whatsapp:
    "Sim! Integramos com WhatsApp Business API para automação de atendimento, envio de mensagens e chatbots inteligentes.",
  demo:
    "Quer agendar uma demonstração? Preencha o formulário de contato acima com seus dados e nossa equipe entrará em contato para agendar!",
  contato:
    "Você pode nos contatar pelo formulário acima ou enviar um e-mail. Nossa equipe responde em até 24 horas.",
};

function findBestResponse(message: string): string {
  const normalizedMsg = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (normalizedMsg.includes(key)) {
      return response;
    }
  }

  if (
    normalizedMsg.includes("ola") ||
    normalizedMsg.includes("oi") ||
    normalizedMsg.includes("bom dia") ||
    normalizedMsg.includes("boa tarde") ||
    normalizedMsg.includes("boa noite")
  ) {
    return "Olá! Bem-vindo à Fluxora AI! Como posso ajudar? Posso falar sobre nossos serviços, planos ou agendar uma demonstração.";
  }

  if (
    normalizedMsg.includes("obrigad") ||
    normalizedMsg.includes("valeu") ||
    normalizedMsg.includes("brigad")
  ) {
    return "Por nada! Se tiver mais alguma dúvida, estou aqui. Você também pode preencher o formulário de contato para falar com nossa equipe.";
  }

  return "Obrigado pela sua mensagem! Para te atender melhor, preencha o formulário de contato acima ou me pergunte sobre nossos serviços, planos e integrações.";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequest;

    if (!body.message) {
      return NextResponse.json(
        { error: "Mensagem é obrigatória." },
        { status: 400 }
      );
    }

    // Forward to n8n chat webhook if configured
    const chatWebhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
    if (chatWebhookUrl) {
      try {
        const webhookRes = await fetch(chatWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: body.message,
            history: body.history || [],
            source: "fluxora-chat-widget",
            timestamp: new Date().toISOString(),
          }),
        });

        if (webhookRes.ok) {
          const webhookData = await webhookRes.json();
          if (webhookData.reply) {
            return NextResponse.json({ reply: webhookData.reply });
          }
        }
      } catch (webhookError) {
        console.error("Chat webhook error:", webhookError);
      }
    }

    // Fallback to local FAQ-based responses
    const reply = findBestResponse(body.message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Desculpe, ocorreu um erro. Tente novamente." },
      { status: 500 }
    );
  }
}
