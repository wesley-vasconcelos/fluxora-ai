import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-glass-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gradient">Kairos AI</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-gray-500">
            <a
              href="#features"
              className="hover:text-accent-cyan transition-colors"
            >
              Recursos
            </a>
            <a
              href="#contact"
              className="hover:text-accent-cyan transition-colors"
            >
              Contato
            </a>
          </div>

          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Kairos AI. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
