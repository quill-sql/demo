import { QuillProvider } from '@quillsql/react';
import { Dashboard } from './Dashboard';

export function App() {
  return (
    <QuillProvider
      publicKey={import.meta.env.VITE_QUILL_PUBLIC_KEY}
      queryEndpoint={`${window.location.origin}/quill`}
    >
      <Dashboard dashboardName="Sales Overview" />
    </QuillProvider>
  );
}
