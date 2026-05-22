"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 hero-gradient bg-grid" />

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-cyan/5 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs sm:text-sm text-gray-400">
              Automação Inteligente powered by IA
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Automatize.{" "}
          <span className="text-gradient">Acelere.</span>
          <br />
          Escale seu Negócio.
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A Fluxora AI elimina tarefas repetitivas, conecta seus sistemas e
          transforma processos manuais em fluxos inteligentes — para que você
          foque no que realmente importa.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#contact"
            className="btn-primary px-8 py-3.5 rounded-xl text-white font-semibold flex items-center gap-2 text-base"
          >
            Comece Gratuitamente
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#how-it-works"
            className="btn-outline px-8 py-3.5 rounded-xl text-gray-300 font-semibold flex items-center gap-2 text-base"
          >
            <Bot className="w-5 h-5" />
            Ver Como Funciona
          </a>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {[
            { value: "10x", label: "Mais Rápido" },
            { value: "85%", label: "Menos Tarefas Manuais" },
            { value: "24/7", label: "Operação Contínua" },
            { value: "3x", label: "ROI em 90 Dias" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gradient">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
