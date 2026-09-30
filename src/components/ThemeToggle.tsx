import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'urusinaja-theme';

function getInitialDark(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

/** Tombol toggle dark/light mode. Preferensi tersimpan di localStorage. */
export function ThemeToggle() {
  const [dark, setDark] = useState(getInitialDark);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {
      /* abaikan */
    }
  }, [dark]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setDark(!dark)}
      aria-label={dark ? 'Ubah ke mode terang' : 'Ubah ke mode gelap'}
      aria-pressed={dark}
      title={dark ? 'Mode terang' : 'Mode gelap'}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
