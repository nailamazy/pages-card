import { cardThemes, CardTheme } from "@/lib/ktm-data";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  currentTheme: CardTheme;
  onSelect: (theme: CardTheme) => void;
}

export function ThemeSelector({ currentTheme, onSelect }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {cardThemes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onSelect(theme)}
          className={`
            group relative h-12 w-full rounded-lg transition-all duration-200
            hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${currentTheme.id === theme.id ? "ring-2 ring-offset-2 ring-primary" : "border border-border"}
          `}
          style={{ background: theme.gradient }}
          title={theme.name}
        >
          {currentTheme.id === theme.id && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/20 p-1 backdrop-blur-sm">
                <Check className="h-4 w-4 text-white" strokeWidth={3} />
              </div>
            </div>
          )}
          <span className="sr-only">{theme.name}</span>
        </button>
      ))}
    </div>
  );
}
