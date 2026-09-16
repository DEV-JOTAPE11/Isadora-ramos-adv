'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Revelar } from '@/components/ui/Revelar';
import { depoimentos } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * Carrossel de avaliações reais de clientes.
 *
 * DESLIGADO POR PADRÃO — ver `config.exibirDepoimentos` em
 * `src/content/site.ts`. Enquanto o array `depoimentos` estiver vazio, a
 * página renderiza <Compromissos> no lugar. O componente fica pronto aqui para
 * o dia em que existirem avaliações verdadeiras (Google, por exemplo).
 *
 * Guarda de segurança: mesmo que a flag seja ligada por engano com o array
 * vazio, o componente não renderiza nada em vez de mostrar um carrossel oco.
 */
export function Depoimentos() {
  const [indice, setIndice] = useState(0);

  if (depoimentos.length === 0) return null;

  const atual = depoimentos[indice]!;
  const mover = (passo: number) =>
    setIndice((i) => (i + passo + depoimentos.length) % depoimentos.length);

  return (
    <section
      aria-labelledby="depoimentos-titulo"
      className="overflow-hidden bg-osso py-24 md:py-32"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="sobrelinha mb-5 justify-center">Depoimentos</p>
          <h2
            id="depoimentos-titulo"
            className="font-display text-[2rem] leading-[1.06] font-semibold tracking-tight text-tinta sm:text-5xl"
          >
            Histórias
          </h2>
          <p className="mb-14 font-destaque uppercase text-[2.1rem] leading-[1.08] text-ouro-600 sm:text-5xl">
            que acompanhei
          </p>
        </div>

        <Revelar y={26} duracao={750}>
          <div className="mx-auto max-w-3xl rounded-[32px] border border-verde-100 bg-white p-10 text-center md:p-14">
            {/* key força o remount → reinicia o keyframe de entrada */}
            <div key={indice} className="anima-painel">
              <div
                className="mb-6 flex items-center justify-center gap-1"
                aria-label={`${atual.estrelas} de 5 estrelas`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={17}
                    aria-hidden="true"
                    className={cn(
                      i < atual.estrelas ? 'fill-verde-500 text-ouro-500' : 'text-verde-100',
                    )}
                  />
                ))}
              </div>

              <blockquote>
                <p className="text-lg leading-relaxed text-grafite italic md:text-2xl">
                  “{atual.texto}”
                </p>
              </blockquote>

              <p className="mt-8 font-display text-base font-semibold text-verde-700">
                {atual.nome}
              </p>
              <p className="mt-1 text-[12px] text-grafite-claro">{atual.data}</p>
            </div>

            {depoimentos.length > 1 ? (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => mover(-1)}
                  aria-label="Depoimento anterior"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-verde-200 text-verde-600 transition-all hover:border-verde-700 hover:bg-verde-700 hover:text-white"
                >
                  <ChevronLeft size={18} />
                </button>

                <p className="text-[12px] tabular-nums text-grafite-claro">
                  {indice + 1} / {depoimentos.length}
                </p>

                <button
                  type="button"
                  onClick={() => mover(1)}
                  aria-label="Próximo depoimento"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-verde-200 text-verde-600 transition-all hover:border-verde-700 hover:bg-verde-700 hover:text-white"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            ) : null}
          </div>
        </Revelar>
      </Container>
    </section>
  );
}
