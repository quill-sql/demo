import { QuillProvider } from '@quillsql/react';
import { Dashboard } from './Dashboard';
import { useQuillTheme } from './theme';

export function App() {
  const theme = useQuillTheme();

  return (
    <QuillProvider
      publicKey={import.meta.env.VITE_QUILL_PUBLIC_KEY}
      queryEndpoint={`${window.location.origin}/quill`}
      theme={theme}
    >
      <Dashboard dashboardName="Sales Overview" />
    </QuillProvider>
  );
}
