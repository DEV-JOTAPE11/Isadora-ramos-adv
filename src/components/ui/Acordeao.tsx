'use client';

import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Item = { pergunta: string; resposta: string };

/**
 * Acordeão do FAQ — um item aberto por vez.
 *
 * A altura anima por `grid-template-rows: 0fr → 1fr`, não por `max-height`:
 * não há número mágico para estourar quando a resposta cresce, e o conteúdo
 * nunca sai da árvore de acessibilidade (`hidden` ficaria invisível a quem usa
 * leitor de tela antes de abrir).
 */
export function Acordeao({ itens }: { itens: readonly Item[] }) {
  const [aberto, setAberto] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="divide-y divide-esmeralda-100">
      {itens.map((item, i) => {
        const estaAberto = aberto === i;
        const idBotao = `${id}-btn-${i}`;
        const idPainel = `${id}-painel-${i}`;

        return (
          <div key={item.pergunta}>
            <h3>
              <button
                type="button"
                id={idBotao}
                aria-expanded={estaAberto}
                aria-controls={idPainel}
                onClick={() => setAberto(estaAberto ? null : i)}
                className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    'font-display text-lg font-medium transition-colors md:text-xl',
                    estaAberto ? 'text-esmeralda-700' : 'text-tinta group-hover:text-esmeralda-600',
                  )}
                >
                  {item.pergunta}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500',
                    estaAberto
                      ? 'rotate-45 border-esmeralda-700 bg-esmeralda-700 text-white'
                      : 'border-esmeralda-200 text-esmeralda-600 group-hover:border-ouro-500 group-hover:text-ouro-600',
                  )}
                >
                  <Plus size={17} />
                </span>
              </button>
            </h3>

            <div
              id={idPainel}
              role="region"
              aria-labelledby={idBotao}
              className={cn(
                'grid transition-[grid-template-rows] duration-500 ease-[var(--ease-expo-out)]',
                estaAberto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pr-16 pb-7 text-[15px] leading-relaxed font-light text-grafite">
                  {item.resposta}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
