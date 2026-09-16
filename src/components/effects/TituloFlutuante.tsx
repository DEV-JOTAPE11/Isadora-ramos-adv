'use client';

import { useEffect, useId, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { garantirConclusaoNoFimDaPagina } from '@/lib/scrub';
import { prefereMenosMovimento } from '@/lib/utils';

type Props = {
  /** Texto do título, quebrado caractere a caractere. */
  texto: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
};

/**
 * Título que "flutua" para cima letra a letra conforme a página rola: cada
 * caractere entra esticado (scaleY 2.3 / scaleX 0.7) e vai assentando, com o
 * progresso amarrado ao scroll (`scrub`), não a uma duração fixa.
 *
 * Porte do `<ScrollFloat>` de `almeida-imports-site`.
 *
 * Os caracteres são agrupados em palavras: como cada um é `inline-block`, sem
 * esse agrupamento o texto quebraria no meio da palavra ("Atendi / mento") e
 * as letras da linha de cima invadiriam a de baixo durante a entrada. A
 * palavra segura a quebra e mascara a própria animação.
 */
export function TituloFlutuante({ texto, className, as = 'h2' }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const id = useId();

  useEffect(() => {
    const wrap = ref.current;
    if (!wrap) return;
    if (prefereMenosMovimento()) return;

    const chars = wrap.querySelectorAll<HTMLSpanElement>('.scroll-float-char');
    if (!chars.length) return;

    const estadoFinal = {
      opacity: 1,
      yPercent: 0,
      scaleY: 1,
      scaleX: 1,
      ease: 'back.inOut(2)',
      stagger: 0.03,
    } as const;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
        },
        {
          ...estadoFinal,
          scrollTrigger: {
            trigger: wrap,
            /* Começa quando o título entra de fato na tela — se a faixa
               abrisse antes, a revelação seria gasta com o texto ainda fora
               da vista e chegaria pela metade na posição de leitura. */
            start: 'top bottom-=15%',
            end: 'bottom bottom-=40%',
            scrub: true,
            /* Ver a explicação em `@/lib/scrub`: sem isso, um título perto do
               rodapé pode congelar no meio da entrada. */
            onRefresh: garantirConclusaoNoFimDaPagina(chars, {
              ...estadoFinal,
              duration: 0.6,
            }),
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, [texto]);

  const Tag = as as 'h2';
  const palavras = texto.split(' ');

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {palavras.map((palavra, iPalavra) => (
        <span key={`${id}-p${iPalavra}`} className="scroll-float-word">
          {Array.from(palavra).map((ch, iChar) => (
            <span key={`${id}-p${iPalavra}-${iChar}`} className="scroll-float-char">
              {ch}
            </span>
          ))}
          {/* O espaço vive dentro da palavra anterior para não virar recuo
              quando a linha quebra logo depois dele. */}
          {iPalavra < palavras.length - 1 ? (
            <span className="scroll-float-char espaco"> </span>
          ) : null}
        </span>
      ))}
    </Tag>
  );
}
