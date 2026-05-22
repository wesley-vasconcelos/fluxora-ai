import { NextResponse } from "next/server";
import { getSupabase, type ContactLead } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactLead;

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Nome, e-mail e mensagem são obrigatórios." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "E-mail inválido." },
        { status: 400 }
      );
    }

    const lead: ContactLead = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      company: body.company?.trim() || null,
      message: body.message.trim(),
    };

    // Save to Supabase if configured
    const supabase = getSupabase();
    if (supabase) {
      const { error: dbError } = await supabase
        .from("contacts")
        .insert([lead]);

      if (dbError) {
        console.error("Supabase error:", dbError);
      }
    }

    // Forward to n8n webhook if configured
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...lead,
            source: "kairos-landing-page",
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (webhookError) {
        console.error("Webhook error:", webhookError);
      }
    }

    return NextResponse.json(
      { success: true, message: "Mensagem recebida com sucesso!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
