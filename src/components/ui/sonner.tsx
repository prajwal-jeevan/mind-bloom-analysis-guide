
// This component is now a simple pass-through to avoid breaking imports
import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from '@/components/ThemeProvider';

export function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  const { theme } = useTheme();
  
  return (
    <SonnerToaster
      theme={theme as 'light' | 'dark' | undefined}
      {...props}
    />
  );
}
