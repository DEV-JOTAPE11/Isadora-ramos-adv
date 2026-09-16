'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  /** Deslocamento vertical inicial, em px. Negativo desce. */
  y?: number;
  /** Deslocamento horizontal inicial, em px. */
  x?: number;
  /** Escala inicial (1 = sem escala). */
  escala?: number;
  /** Duração em ms. */
  duracao?: number;
  /** Atraso em ms. */
  atraso?: number;
  className?: string;
  /** Elemento renderizado. Padrão: div. */
  as?: ElementType;
  /** Estilos extras — serve para passar custom properties aos filhos. */
  style?: CSSProperties;
};

/**
 * Entrada ao rolar via IntersectionObserver + CSS puro — porte direto do
 * `<Reveal>` do projeto `lp-adv`.
 *
 * Anima só opacity e transform, dispara uma única vez e desconecta o observer
 * em seguida. Sob `prefers-reduced-motion` o CSS neutraliza o efeito (ver
 * globals.css); nada precisa ser checado aqui.
 */
export function Revelar({
  children,
  y = 24,
  x = 0,
  escala = 1,
  duracao = 700,
  atraso = 0,
  className,
  as: Tag = 'div',
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Sem suporte a IntersectionObserver, mostra imediatamente.
    if (typeof IntersectionObserver === 'undefined') {
      setVisivel(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisivel(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visivel}
      className={cn('reveal', className)}
      style={
        {
          '--reveal-y': `${y}px`,
          '--reveal-x': `${x}px`,
          '--reveal-s': escala,
          '--reveal-d': `${duracao}ms`,
          '--reveal-delay': `${atraso}ms`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
