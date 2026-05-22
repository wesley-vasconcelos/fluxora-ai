"use client";

import { motion } from "framer-motion";
import { Search, Settings, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico",
    description:
      "Analisamos seus processos atuais e identificamos gargalos e oportunidades de automação.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Configuração",
    description:
      "Criamos fluxos inteligentes personalizados conectando todas as suas ferramentas e sistemas.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Implementação",
    description:
      "Ativamos suas automações com testes, monitoramento e ajustes em tempo real.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Otimização",
    description:
      "IA aprende continuamente e otimiza seus fluxos para máxima eficiência e resultados.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent-purple text-sm font-mono uppercase tracking-widest">
            Processo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Como <span className="text-gradient">funciona</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Do diagnóstico à operação autônoma em 4 etapas simples.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-accent-cyan/20 to-transparent z-0" />
              )}

              <div className="glass-card rounded-2xl p-6 sm:p-8 relative z-10 text-center">
                <div className="text-5xl font-bold text-accent-cyan/10 mb-4 font-mono">
                  {step.number}
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 flex items-center justify-center mx-auto mb-5 text-accent-cyan">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
