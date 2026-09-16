import Image from 'next/image';
import { TituloDesfoque } from '@/components/effects/TituloDesfoque';
import { Container } from '@/components/ui/Container';
import { Revelar } from '@/components/ui/Revelar';
import { incerteza } from '@/content/site';
import { ASSETS } from '@/lib/assets';

/**
 * Card "Quando a Incerteza Encontra o Direito" — porte da seção de mesmo nome
 * do projeto `alecsandra-resende-adv`.
 *
 * O original era um degradê cinza → branco. Aqui o card segue a linguagem do
 * `Fruity-main`: verde quase preto, um halo lima atrás da estátua e o título
 * em Barlow Condensed + Anton caixa-alta dourada. A arte dourada da balança tem fundo
 * transparente e ganha contraste justamente sobre o escuro.
 */
export function Incerteza() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <Container>
        <Revelar y={32} duracao={800}>
          <div className="relative isolate grid items-center gap-8 overflow-hidden rounded-shell bg-verde-950 px-6 py-12 sm:px-10 md:grid-cols-2 md:gap-5 md:px-[60px] md:py-14 lg:grid-cols-[1fr_505px]">
            {/* Halo lima atrás da estátua. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -bottom-24 -z-10 h-[520px] w-[520px] rounded-full bg-verde-400/20 blur-[120px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(100deg,var(--color-verde-950)_0%,var(--color-verde-900)_55%,var(--color-verde-800)_100%)]"
            />

            <div>
              <p className="sobrelinha sobrelinha-clara mb-6">Por que estamos aqui</p>

              <TituloDesfoque
                texto={incerteza.titulo}
                as="h2"
                className="font-display text-[2.2rem] leading-[1.02] font-semibold tracking-tight text-white sm:text-5xl md:text-[3.25rem]"
              >
                <span className="mt-1 block font-destaque text-[2.2rem] leading-[1.05] text-ouro-400 uppercase sm:text-5xl md:text-[3.25rem]">
                  {incerteza.tituloDestaque}
                </span>
              </TituloDesfoque>

              <p className="mt-7 max-w-xl text-[16px] leading-[1.8] font-light text-white/70 md:text-[17px]">
                {incerteza.paragrafo}
              </p>
            </div>

            <Image
              src={ASSETS.balancaDignidade.src}
              alt={ASSETS.balancaDignidade.alt}
              width={ASSETS.balancaDignidade.width}
              height={ASSETS.balancaDignidade.height}
              sizes="(max-width: 768px) 90vw, 505px"
              className="mx-auto h-auto w-full max-w-[505px]"
            />
          </div>
        </Revelar>
      </Container>
    </section>
  );
}
