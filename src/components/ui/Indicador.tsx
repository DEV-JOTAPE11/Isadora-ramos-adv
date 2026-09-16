import { Contador } from '@/components/ui/Contador';
import type { CSSProperties } from 'react';

/**
 * Selo circular de indicador: um anel SVG que se desenha, o número contando
 * de zero e duas linhas de rótulo. Porte do `<StatBadge>` de `lp-adv`.
 *
 * O anel é dirigido pelo `data-visible` do `<Revelar>` que envolve a linha
 * inteira (ver `.anel-indicador` no globals.css) — nenhum observer extra,
 * nenhum estado em JS aqui. `--anel-delay` escalona os três.
 */
export function Indicador({
  valor,
  linha1,
  linha2,
  indice,
  claro = false,
}: {
  valor: string;
  linha1: string;
  linha2: string;
  indice: number;
  claro?: boolean;
}) {
  const atraso = indice * 180;

  return (
    <div
      className="flex min-w-0 flex-col items-center gap-2.5 text-center"
      style={{ '--anel-delay': `${atraso}ms` } as CSSProperties}
    >
      {/*
        Os três selos ficam lado a lado numa linha só. Em 360–400px de tela o
        card já gasta a calha e o próprio padding, então o diâmetro precisa
        começar pequeno: 3 × 80px + vãos ainda cabe, 3 × 96px não cabia e
        empurrava a linha para fora da viewport.
      */}
      <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24 md:h-28 md:w-28">
        <svg viewBox="0 0 108 108" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle
            cx="54"
            cy="54"
            r="48"
            fill="none"
            strokeWidth="1.5"
            className={claro ? 'stroke-white/12' : 'stroke-verde-100'}
          />
          <circle
            cx="54"
            cy="54"
            r="48"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            /* 2πr = 301.6 — o mesmo valor está no globals.css como offset
               inicial, então o traço nasce completamente recolhido. */
            strokeDasharray="301.6"
            className={`anel-indicador ${claro ? 'stroke-verde-400' : 'stroke-verde-500'}`}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <Contador
            valor={valor}
            atraso={atraso + 200}
            className={`font-display text-xl font-semibold tabular-nums sm:text-2xl md:text-3xl ${
              claro ? 'text-white' : 'text-verde-800'
            }`}
          />
        </div>
      </div>

      <p
        className={`text-[10px] leading-snug font-medium tracking-[0.14em] uppercase sm:text-[11px] sm:tracking-[0.18em] ${
          claro ? 'text-white/55' : 'text-grafite-claro'
        }`}
      >
        {linha1}
        <br />
        {linha2}
      </p>
    </div>
  );
}
