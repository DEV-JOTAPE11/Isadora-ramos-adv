import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Caixa de leitura padrão: 1200px úteis + 24px de calha lateral no mobile. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-6', className)}>{children}</div>;
}
