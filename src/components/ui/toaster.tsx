
// This component is now a simple pass-through to avoid breaking imports
import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return <SonnerToaster position="top-right" richColors />;
}
