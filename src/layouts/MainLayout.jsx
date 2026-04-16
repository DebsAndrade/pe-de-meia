import { NavLink, Outlet } from "react-router";
import { useContext } from 'react';
import { LayoutDashboard, History, Settings, Plus, Sun, Moon } from 'lucide-react';

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
import { ThemeContext } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

const navLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/historico", label: "Histórico", icon: History },
  { to: "/definicoes", label: "Definições", icon: Settings },
]

export default function MainLayout() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="hidden md:flex sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="w-full flex items-center gap-6 px-6 h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <img src={theme === 'dark' ? '/assets/logo-dark.png' : '/assets/logo.png'} alt="Pé de Meia" className="h-14 w-auto" />
          </NavLink>

          {/* Nav links */}
          <nav className="flex items-center gap-1 flex-1">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Ações à direita */}
          <div className="flex items-center gap-2">
            <NavLink to="/adicionar">
              {({ isActive }) => (
                <Button size="sm" variant={isActive ? "default" : "income"} className="gap-1.5">
                  <Plus className="h-4 w-4" />
                  Adicionar
                </Button>
              )}
            </NavLink>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 w-full px-6 py-6 pb-24 md:pb-6">
        <Outlet />
      </main>

      {/* Footer — desktop */}
      <footer className="hidden md:block border-t border-border bg-background/95">
        <div className="w-full px-6 py-8 flex flex-col items-center gap-4">
          <img
            src={theme === 'dark' ? '/assets/logo-dark.png' : '/assets/logo.png'}
            alt="Pé de Meia"
            className="h-12 w-auto opacity-80"
          />
          <span>Desenvolvido por</span>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <a
              href="https://github.com/DebsAndrade"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              Débora Andrade
            </a>
            <span>&amp;</span>
            <a
              href="https://github.com/Gabi-Ayres"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              Gabriella Ayres
            </a>
          </div>
        </div>
      </footer>

      {/* Footer — mobile (acima do nav fixo) */}
      <div className="md:hidden border-t border-border bg-background/95 py-6 px-4 pb-20 flex flex-col items-center gap-3 text-xs text-muted-foreground">
        <img
          src={theme === 'dark' ? '/assets/logo-dark.png' : '/assets/logo.png'}
          alt="Pé de Meia"
          className="h-10 w-auto opacity-80"
        />
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/DebsAndrade"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            Débora Andrade
          </a>
          <span>&amp;</span>
          <a
            href="https://github.com/Gabi-Ayres"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            Gabriella Ayres
          </a>
        </div>
      </div>

      {/* Bottom Nav — visível só em mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="flex items-center justify-around h-16 px-2">
          {navLinks.map((link) => {
            const NavIcon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <NavIcon className={cn("h-5 w-5", isActive && "text-income")} />
                    <span>{link.label}</span>
                  </>
                )}
              </NavLink>
            )
          })}

          {/* Botão Adicionar em destaque */}
          <NavLink to="/adicionar">
            {({ isActive }) => (
              <div className="flex flex-col items-center gap-1 px-3 py-2">
                <div className={cn(
                  "flex items-center justify-center h-10 w-10 rounded-full transition-colors",
                  isActive ? "bg-income text-income-foreground" : "bg-primary text-primary-foreground"
                )}>
                  <Plus className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Adicionar</span>
              </div>
            )}
          </NavLink>

          {/* Toggle tema no mobile */}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center gap-1 px-3 py-2 text-muted-foreground"
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="text-xs font-medium">Tema</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
