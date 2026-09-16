import Image from 'next/image';
import { TituloFlutuante } from '@/components/effects/TituloFlutuante';
import { Container } from '@/components/ui/Container';
import { ICONES_PILAR } from '@/components/ui/Icones';
import { Revelar } from '@/components/ui/Revelar';
import { porQue } from '@/content/site';
import { ASSETS } from '@/lib/assets';

/**
 * "Por que escolher" — os quatro pilares do atendimento.
 *
 * Layout em duas colunas: título e foto de atendimento à esquerda, pilares
 * empilhados à direita. É a única foto com pessoas da página, e está aqui de
 * propósito: ancora a seção no concreto — duas pessoas conversando — depois de
 * dois blocos seguidos de símbolo abstrato.
 */
export function PorQue() {
  return (
    <section className="overflow-hidden bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="sobrelinha mb-5">{porQue.sobrelinha}</p>

            <TituloFlutuante
              texto={porQue.titulo}
              as="h2"
              className="font-display text-[1.9rem] leading-[1.08] font-semibold tracking-tight text-tinta sm:text-[2.6rem] md:text-[2.9rem]"
            />
            <p className="font-serif text-[2rem] leading-[1.1] font-light text-ouro-600 italic sm:text-[2.7rem] md:text-[3rem]">
              {porQue.tituloDestaque}
            </p>

            <Revelar y={22} duracao={700} atraso={120}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed font-light text-grafite">
                {porQue.paragrafo}
              </p>
            </Revelar>

            <Revelar x={-28} y={0} duracao={850} atraso={180}>
              <div className="relative mt-12 overflow-hidden rounded-[28px]">
                <Image
                  src={ASSETS.atendimento.src}
                  alt={ASSETS.atendimento.alt}
                  width={ASSETS.atendimento.width}
                  height={ASSETS.atendimento.height}
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="h-[260px] w-full object-cover md:h-[320px]"
                />
                {/* Véu esmeralda: alinha a foto (cinza-azulada) à paleta. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-esmeralda-900/35 mix-blend-multiply"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-esmeralda-950/80 to-transparent"
                />
                <p className="absolute inset-x-8 bottom-7 font-serif text-lg leading-snug font-light text-ouro-200 italic">
                  Cada caso tem um nome, uma história e uma pessoa esperando resposta.
                </p>
              </div>
            </Revelar>
          </div>

          {/*
            Os pilares são <dl> e não <ul>: cada item é literalmente um termo e
            a sua definição, e leitores de tela anunciam a relação.
          */}
          <dl className="grid gap-px overflow-hidden rounded-[28px] bg-esmeralda-100 sm:grid-cols-2">
            {porQue.pilares.map((pilar, i) => {
              const Icone = ICONES_PILAR[pilar.icone];
              return (
                <Revelar
                  key={pilar.titulo}
                  y={24}
                  duracao={650}
                  atraso={i * 110}
                  className="group bg-white p-9 transition-colors duration-500 hover:bg-esmeralda-50 md:p-10"
                >
                  <span className="mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-ouro-400/50 text-ouro-600 transition-all duration-500 group-hover:border-esmeralda-700 group-hover:bg-esmeralda-800 group-hover:text-ouro-300">
                    <Icone className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <dt className="mb-3 font-display text-lg font-semibold text-tinta">
                    {pilar.titulo}
                  </dt>
                  <dd className="text-[14px] leading-relaxed font-light text-grafite">
                    {pilar.texto}
                  </dd>
                </Revelar>
              );
            })}
          </dl>
        </div>
      </Container>
    </section>
  );
}
