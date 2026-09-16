'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  /** Os `<li>` da lista. Vêm de um Server Component. */
  children: ReactNode;
  /** Quantos slides existem — usado no contador e no limite das setas. */
  total: number;
  /** `aria-label` da lista. */
  rotulo: string;
  /** Dica que aparece até a primeira interação. */
  dica?: string;
  className?: string;
};

/**
 * Carrossel horizontal APENAS no mobile. A partir de `sm` o mesmo `<ul>` volta
 * a ser a grade de cards — nenhum conteúdo é duplicado e nada é remontado.
 *
 * COMO A TROCA ACONTECE
 * O `<ul>` é `flex` + `overflow-x-auto` + `snap-x` na base e `sm:grid` daí para
 * cima. Os slides recebem largura fixa no mobile e `sm:w-auto`.
 * É tudo CSS: não há media query em JS, então não existe o "pisca" de layout de
 * um carrossel que só se monta depois da hidratação.
 *
 * As classes que cada slide precisa estão em `SLIDE_CARROSSEL` (`@/lib/carrossel`),
 * fora deste arquivo de propósito — ver o comentário lá.
 *
 * O `-mx-6 px-6` sangra a trilha até a borda da tela mantendo o primeiro card
 * alinhado à calha do `<Container>` — é o que faz o próximo card "espiar" pela
 * direita e denunciar que a lista continua.
 *
 * ROLAGEM NATIVA, NÃO TRANSFORM
 * O deslocamento é `scrollLeft` de verdade, com `scroll-snap`. Em troca de um
 * pouco menos de controle sobre a curva, ganha-se o gesto do sistema (inércia,
 * borracha no fim, trackpad) e navegação por teclado de graça: dar Tab para um
 * link fora da vista faz o próprio navegador rolar a trilha até ele.
 *
 * As setas e o contador são `sm:hidden`. No desktop o listener de scroll
 * continua ligado, mas a trilha não rola (é grade), então `scrollLeft` fica em
 * 0 e nada acontece.
 */

export function CarrosselMobile({ children, total, rotulo, dica, className }: Props) {
  const trilhaRef = useRef<HTMLUListElement>(null);
  const [indice, setIndice] = useState(0);
  const [interagiu, setInteragiu] = useState(false);

  /**
   * Posição de cada slide dentro da trilha, já descontado o padding lateral.
   * Medido do DOM em vez de calculado por `largura × índice`: os slides usam
   * `max-w`, então acima de ~400px de tela a largura para de acompanhar a vw e
   * a conta daria errado justamente nos aparelhos maiores.
   */
  const posicoes = useCallback(() => {
    const trilha = trilhaRef.current;
    if (!trilha) return [];

    const itens = Array.from(trilha.children) as HTMLElement[];
    const base = itens[0]?.offsetLeft ?? 0;
    return itens.map((item) => item.offsetLeft - base);
  }, []);

  useEffect(() => {
    const trilha = trilhaRef.current;
    if (!trilha) return;

    let raf = 0;

    const aoRolar = () => {
      // A rolagem dispara dezenas de eventos por gesto; um quadro basta.
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;

        const lista = posicoes();
        if (!lista.length) return;

        const x = trilha.scrollLeft;
        let maisProximo = 0;
        for (let i = 1; i < lista.length; i++) {
          if (Math.abs(lista[i]! - x) < Math.abs(lista[maisProximo]! - x)) maisProximo = i;
        }

        setIndice(maisProximo);
        setInteragiu(true);
      });
    };

    trilha.addEventListener('scroll', aoRolar, { passive: true });
    return () => {
      trilha.removeEventListener('scroll', aoRolar);
      cancelAnimationFrame(raf);
    };
  }, [posicoes]);

  const irPara = (destino: number) => {
    const trilha = trilhaRef.current;
    const lista = posicoes();
    const alvo = lista[Math.max(0, Math.min(total - 1, destino))];
    if (!trilha || alvo === undefined) return;

    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    trilha.scrollTo({ left: alvo, behavior: reduzido ? 'auto' : 'smooth' });
  };

  return (
    <>
      <ul
        ref={trilhaRef}
        aria-label={rotulo}
        className={cn(
          /* `trilha-carrossel` é o gancho da regra que desliga o reveal
             individual dos cards no mobile — ver globals.css. */
          'trilha-carrossel no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 px-6 pb-2',
          'sm:mx-0 sm:grid sm:snap-none sm:gap-5 sm:overflow-x-visible sm:px-0 sm:pb-0',
          className,
        )}
      >
        {children}
      </ul>

      {/*
        A dica some assim que a pessoa rola — depois disso ela já sabe. Fica no
        DOM (só transparente) para não empurrar os controles ao sair.
      */}
      {dica ? (
        <p
          aria-hidden="true"
          className={cn(
            'mt-5 text-[11px] tracking-[0.2em] text-grafite-claro uppercase transition-opacity duration-500 sm:hidden',
            interagiu && 'opacity-0',
          )}
        >
          {dica}
        </p>
      ) : null}

      {/* Controles — só existem enquanto a trilha rola. */}
      <div className="mt-4 flex items-center gap-4 sm:hidden">
        <p className="shrink-0 text-[11px] font-medium tracking-[0.18em] text-esmeralda-700 tabular-nums">
          {String(indice + 1).padStart(2, '0')}
          <span className="text-grafite-claro"> / {String(total).padStart(2, '0')}</span>
        </p>

        {/*
          Barra de progresso no lugar de bolinhas: com oito slides, oito pontos
          viram uma fileira de ruído com alvo de toque pequeno demais. A barra
          diz a mesma coisa e cabe na linha do contador.
        */}
        <div aria-hidden="true" className="h-px flex-1 overflow-hidden bg-esmeralda-100">
          <span
            className="block h-full bg-ouro-500 transition-[width] duration-500 ease-[var(--ease-expo-out)]"
            style={{ width: `${((indice + 1) / total) * 100}%` }}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => irPara(indice - 1)}
            disabled={indice === 0}
            aria-label="Área anterior"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-esmeralda-200 text-esmeralda-700 transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={17} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => irPara(indice + 1)}
            disabled={indice === total - 1}
            aria-label="Próxima área"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-esmeralda-200 text-esmeralda-700 transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
