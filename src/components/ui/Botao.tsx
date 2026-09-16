import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * `.btn-advocacia` — o botão-assinatura da página (ver globals.css).
 * Pílula com borda verde-lima e um retângulo verde que cresce da direita
 * para a esquerda no hover. Ícones devem receber a classe `icone` para
 * deslizar junto.
 *
 * `variante="solido"` preenche de verde já em repouso — para o CTA
 * principal sobre fundo claro, onde a pílula vazada some.
 */

type Variante = 'contorno' | 'solido';

type Comum = { children: ReactNode; className?: string; variante?: Variante };

const classes = (variante: Variante = 'contorno', className?: string) =>
  cn('btn-advocacia group', variante === 'solido' && 'btn-solido', className);

export function BotaoLink({
  children,
  className,
  variante,
  ...props
}: Comum & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={classes(variante, className)} {...props}>
      {children}
    </a>
  );
}

export function Botao({
  children,
  className,
  variante,
  type = 'button',
  ...props
}: Comum & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes(variante, className)} {...props}>
      {children}
    </button>
  );
}
