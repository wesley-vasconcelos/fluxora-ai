"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "bot",
  content:
    "Olá! Sou a assistente virtual da Fluxora AI. Como posso ajudar você hoje? Posso falar sobre nossos serviços de automação, planos ou agendar uma demonstração.",
  timestamp: new Date(),
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content:
          data.reply ||
          "Obrigado pela mensagem! Nossa equipe entrará em contato em breve.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content:
          "Desculpe, tive um problema técnico. Por favor, tente novamente ou entre em contato pelo formulário acima.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full btn-primary flex items-center justify-center shadow-lg glow-cyan"
          aria-label="Abrir chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] glass-card rounded-2xl flex flex-col overflow-hidden glow-cyan border border-accent-cyan/20">
          <div className="flex items-center justify-between px-4 py-3 border-b border-glass-border bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold">Fluxora AI</div>
                <div className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "bot"
                      ? "bg-accent-cyan/20 text-accent-cyan"
                      : "bg-accent-purple/20 text-accent-purple"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <Bot className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-white/5 text-gray-200"
                      : "bg-accent-cyan/15 text-white"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-accent-cyan/20 text-accent-cyan flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white/5 px-4 py-3 rounded-xl">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="px-4 py-3 border-t border-glass-border flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-glass-border text-white placeholder-gray-500 text-sm focus:outline-none focus:border-accent-cyan/50 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              aria-label="Enviar"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
