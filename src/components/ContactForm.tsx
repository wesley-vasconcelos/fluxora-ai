"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Erro ao enviar mensagem.");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Erro ao enviar mensagem."
      );
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent-cyan text-sm font-mono uppercase tracking-widest">
            Contato
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Vamos <span className="text-gradient">conversar</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Deixe seus dados e nossa equipe entrará em contato para entender
            suas necessidades.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-8 sm:p-10 glow-purple"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Nome *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-glass-border text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/20 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-glass-border text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/20 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                WhatsApp
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(11) 99999-9999"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-glass-border text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/20 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Nome da empresa"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-glass-border text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/20 transition-all"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Mensagem *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Como podemos ajudar?"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-glass-border text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/20 transition-all resize-none"
            />
          </div>

          {status === "success" && (
            <div className="flex items-center gap-2 mb-4 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 mb-4 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full btn-primary py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar Mensagem
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
