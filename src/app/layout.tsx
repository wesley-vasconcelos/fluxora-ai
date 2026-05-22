import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fluxora AI — Automação Inteligente de Tarefas com IA",
  description:
    "Transforme seu negócio com automação inteligente. A Fluxora AI elimina tarefas repetitivas, otimiza processos e impulsiona resultados com inteligência artificial de ponta.",
  keywords: [
    "automação",
    "inteligência artificial",
    "IA",
    "automação de tarefas",
    "produtividade",
    "Fluxora AI",
  ],
  openGraph: {
    title: "Fluxora AI — Automação Inteligente de Tarefas com IA",
    description:
      "Elimine tarefas repetitivas e escale seu negócio com automação inteligente powered by IA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
