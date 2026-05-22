"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "497",
    period: "/mês",
    description: "Ideal para pequenas empresas que querem começar a automatizar.",
    features: [
      "Até 5 automações ativas",
      "1 chatbot com IA",
      "Integrações básicas",
      "Suporte por e-mail",
      "Dashboard de analytics",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "997",
    period: "/mês",
    description:
      "Para empresas em crescimento que precisam de automação avançada.",
    features: [
      "Automações ilimitadas",
      "3 chatbots com IA",
      "Integrações avançadas",
      "Suporte prioritário",
      "Analytics avançado",
      "Agentes autônomos",
      "API personalizada",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Soluções sob medida para grandes operações.",
    features: [
      "Tudo do plano Pro",
      "Chatbots ilimitados",
      "Integrações custom",
      "Gerente de sucesso dedicado",
      "SLA garantido",
      "Treinamento da equipe",
      "Infraestrutura dedicada",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent-blue text-sm font-mono uppercase tracking-widest">
            Planos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-6">
            Escolha o plano{" "}
            <span className="text-gradient">ideal</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comece pequeno, escale rápido. Todos os planos incluem setup gratuito
            e 14 dias de teste.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "glass-card glow-cyan border-accent-cyan/20"
                  : "glass-card"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-accent-cyan to-accent-blue rounded-full text-xs font-semibold text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Mais Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold">
                  {plan.price === "Custom" ? "" : "R$"}
                  {plan.price}
                </span>
                <span className="text-gray-400 text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <Check className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlighted
                    ? "btn-primary text-white"
                    : "btn-outline text-gray-300"
                }`}
              >
                {plan.price === "Custom" ? "Fale Conosco" : "Começar Agora"}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
