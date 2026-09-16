'use client';

import { useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Revelar } from '@/components/ui/Revelar';
import { processo } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * "Como trabalho" — as quatro etapas do atendimento.
 *
 * Porte do `<Process>` de `lp-adv`: seletor numerado no topo e um painel de
 * texto que troca com fade-up. O `key={ativo}` força o remount do bloco, o que
 * reinicia o keyframe — é o equivalente em CSS ao `AnimatePresence mode="wait"`
 * do framer-motion, sem a biblioteca.
 *
 * O seletor segue o padrão ARIA de abas: as setas (e Home/End) movem foco e
 * seleção juntos; Tab entra e sai do grupo inteiro, não passa de aba em aba.
 */
export function Processo() {
  const [ativo, setAtivo] = useState(0);
  const abasRef = useRef<(HTMLButtonElement | null)[]>([]);

  const atual = processo.passos[ativo] ?? processo.passos[0];
  if (!atual) return null;

  const focarAba = (indice: number) => {
    const proximo = (indice + processo.passos.length) % processo.passos.length;
    setAtivo(proximo);
    abasRef.current[proximo]?.focus();
  };

  const aoTeclar = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        focarAba(ativo + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        focarAba(ativo - 1);
        break;
      case 'Home':
        e.preventDefault();
        focarAba(0);
        break;
      case 'End':
        e.preventDefault();
        focarAba(processo.passos.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <section
      id="processo"
      aria-labelledby="processo-titulo"
      className="overflow-hidden bg-osso py-24 md:py-32"
    >
      <Container>
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
          <div className="relative">
            <div aria-hidden="true" className="absolute -top-28 -left-14 opacity-[0.04]">
              <Quote size={300} className="rotate-180 text-esmeralda-900" />
            </div>

            <Revelar x={-30} y={0} duracao={800} className="relative z-10">
              <p className="sobrelinha mb-5">{processo.sobrelinha}</p>
              <h2
                id="processo-titulo"
                className="font-display text-[2rem] leading-[1.06] font-semibold tracking-tight text-tinta sm:text-5xl md:text-[3.25rem]"
              >
                {processo.titulo}
              </h2>
              <p className="font-serif text-[2.1rem] leading-[1.08] font-light text-ouro-600 italic sm:text-5xl md:text-[3.4rem]">
                {processo.tituloDestaque}
              </p>
            </Revelar>
          </div>

          <div className="flex w-full flex-col items-center">
            <div
              role="tablist"
              aria-label="Etapas do atendimento"
              onKeyDown={aoTeclar}
              className="no-scrollbar mb-10 flex w-full flex-nowrap items-center justify-center gap-4 overflow-x-auto px-4 py-8 md:gap-6"
            >
              {processo.passos.map((passo, i) => {
                const selecionada = i === ativo;
                return (
                  <button
                    key={passo.numero}
                    ref={(node) => {
                      abasRef.current[i] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`etapa-aba-${i}`}
                    aria-selected={selecionada}
                    aria-controls="etapa-painel"
                    tabIndex={selecionada ? 0 : -1}
                    onClick={() => setAtivo(i)}
                    className={cn(
                      'relative flex shrink-0 cursor-pointer items-center justify-center rounded-full font-display transition-all duration-500 active:scale-95',
                      selecionada
                        ? 'z-10 h-16 w-16 scale-110 bg-esmeralda-700 text-xl text-ouro-200 shadow-[0_18px_40px_-12px_rgba(17,84,55,0.55)] ring-[9px] ring-esmeralda-100/70 md:h-20 md:w-20 md:text-2xl md:ring-[12px]'
                        : 'h-11 w-11 border border-esmeralda-200 bg-white text-base text-esmeralda-600 hover:border-ouro-500 hover:text-ouro-600 md:h-12 md:w-12',
                    )}
                  >
                    <span className="sr-only">Etapa {passo.numero}: </span>
                    <span aria-hidden="true">{passo.numero}</span>
                    <span className="sr-only">{passo.titulo}</span>
                  </button>
                );
              })}
            </div>

            <div
              id="etapa-painel"
              role="tabpanel"
              aria-labelledby={`etapa-aba-${ativo}`}
              tabIndex={0}
              className="min-h-[230px] max-w-sm text-center"
            >
              {/* key força o remount → reinicia o keyframe `anima-painel` */}
              <div key={ativo} className="anima-painel">
                <p className="mb-2 text-[11px] font-bold tracking-[0.3em] text-ouro-600 uppercase">
                  Etapa {atual.numero}
                </p>
                <h3 className="mb-6 font-display text-2xl font-semibold text-tinta">
                  {atual.titulo}
                </h3>
                <p className="text-[15px] leading-relaxed font-light text-grafite">{atual.texto}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
