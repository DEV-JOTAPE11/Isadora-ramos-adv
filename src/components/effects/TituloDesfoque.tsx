'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { garantirConclusaoNoFimDaPagina } from '@/lib/scrub';
import { prefereMenosMovimento } from '@/lib/utils';

type Props = {
  /** Texto do título, quebrado caractere a caractere. */
  texto: string;
  className?: string;
  /** Tag semântica. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  /** Renderizado depois do texto animado — ex.: a segunda linha do título. */
  children?: ReactNode;
};

/**
 * Título revelado caractere a caractere, atrelado ao scroll.
 *
 * Porte do `<BlurRevealText>` de `almeida-imports-site`: cada caractere parte
 * de `opacity: 0 / blur(10px)` e chega a `opacity: 1 / blur(0)` com
 * `duration: 0.5`, `ease: power3.out`, `stagger: 0.035` e `scrub: 1` entre
 * `top 85%` e `top 40%` — o progresso vem da rolagem, não de um relógio.
 *
 * Os caracteres são spans INLINE, não `inline-block`: sem caixa própria eles
 * não mudam a quebra de linha nem o kerning do título, então o texto ocupa
 * exatamente o mesmo espaço com a animação ligada ou desligada. Só `opacity` e
 * `filter` mudam, e nenhum dos dois move o layout.
 */
export function TituloDesfoque({ texto, className, as = 'h2', children }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    if (prefereMenosMovimento()) return;

    const chars = wrap.querySelectorAll<HTMLSpanElement>('.blur-reveal-char');
    if (!chars.length) return;

    const estadoFinal = {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power3.out',
      stagger: 0.035,
    } as const;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, filter: 'blur(10px)' },
        {
          ...estadoFinal,
          scrollTrigger: {
            trigger: wrap,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
            onRefresh: garantirConclusaoNoFimDaPagina(chars, estadoFinal),
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [texto]);

  const Tag = as as 'h2';

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {Array.from(texto).map((ch, i) =>
        /* Espaços ficam como texto puro: a quebra de linha continua sendo
           decidida pelo navegador, palavra a palavra. */
        ch === ' ' ? (
          <span key={i}> </span>
        ) : (
          <span key={i} className="blur-reveal-char">
            {ch}
          </span>
        ),
      )}
      {children}
    </Tag>
  );
}
