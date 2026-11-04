import { useEffect, useState } from 'react';
import type { QuillTheme } from '@quillsql/react';

// Mirrors the --bg/--surface/--fg/--muted/--border values in dashboard.css.
const shared: QuillTheme = {
  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
  chartLabelFontFamily: 'ui-sans-serif, system-ui, sans-serif',
  chartColors: ['#5b8def', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4'],
};

const light: QuillTheme = {
  ...shared,
  backgroundColor: '#ffffff',
  hoverBackgroundColor: '#f1f1f3',
  primaryTextColor: '#171717',
  secondaryTextColor: '#6b6b6b',
  borderColor: '#e3e3e6',
  chartLabelColor: '#6b6b6b',
  chartTickColor: '#e3e3e6',
  primaryButtonColor: '#171717',
  primaryButtonTextColor: '#ffffff',
};

const dark: QuillTheme = {
  ...shared,
  backgroundColor: '#18181b',
  hoverBackgroundColor: '#27272a',
  primaryTextColor: '#f4f4f5',
  secondaryTextColor: '#a1a1aa',
  borderColor: '#2e2e32',
  chartLabelColor: '#a1a1aa',
  chartTickColor: '#2e2e32',
  primaryButtonColor: '#f4f4f5',
  primaryButtonTextColor: '#18181b',
};

const query = '(prefers-color-scheme: dark)';

/** Quill theme that follows the OS light/dark setting, like dashboard.css does. */
export function useQuillTheme(): QuillTheme {
  const [isDark, setIsDark] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isDark ? dark : light;
}
