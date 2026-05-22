"use client";

import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Recursos", href: "#features" },
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "Contato", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gradient">Kairos AI</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-accent-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary px-5 py-2 rounded-lg text-sm font-semibold text-white"
            >
              Começar Agora
            </a>
          </div>

          <button
            className="md:hidden text-gray-400"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-card border-t border-glass-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-gray-400 hover:text-accent-cyan transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block btn-primary px-5 py-2 rounded-lg text-sm font-semibold text-white text-center"
              onClick={() => setOpen(false)}
            >
              Começar Agora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
