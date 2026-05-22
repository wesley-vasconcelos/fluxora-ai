"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Workflow,
  Zap,
  ShieldCheck,
  BarChart3,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Automação de Fluxos",
    description:
      "Conecte seus apps e automatize fluxos complexos sem código. De CRM a e-mail, tudo integrado.",
    color: "text-accent-cyan",
  },
  {
    icon: Bot,
    title: "Agentes de IA",
    description:
      "Agentes inteligentes que aprendem com seus processos e executam tarefas de forma autônoma 24/7.",
    color: "text-accent-purple",
  },
  {
    icon: MessageSquare,
    title: "Atendimento Inteligente",
    description:
      "Chatbots com IA que entendem contexto, respondem com precisão e escalam para humanos quando necessário.",
    color: "text-accent-blue",
  },
  {
    icon: Zap,
    title: "Integração Instantânea",
    description:
      "Conecte WhatsApp, Instagram, CRM, ERP e mais de 500 aplicações em minutos.",
    color: "text-accent-cyan",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Dashboards em tempo real com métricas de performance, gargalos identificados e sugestões de otimização.",
    color: "text-accent-purple",
  },
  {
    icon: ShieldCheck,
    title: "Segurança & LGPD",
    description:
      "Dados criptografados, compliance com LGPD e controle total sobre permissões e acessos.",
    color: "text-accent-blue",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent-cyan text-sm font-mono uppercase tracking-widest">
            Recursos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Tudo que você precisa para{" "}
            <span className="text-gradient">automatizar</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ferramentas poderosas de IA projetadas para eliminar trabalho manual
            e escalar seu negócio sem aumentar a equipe.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card glass-card rounded-2xl p-6 sm:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 flex items-center justify-center mb-5 ${feature.color}`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
