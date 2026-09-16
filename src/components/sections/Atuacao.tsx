import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { TituloFlutuante } from '@/components/effects/TituloFlutuante';
import { CarrosselMobile } from '@/components/ui/CarrosselMobile';
import { Container } from '@/components/ui/Container';
import { ICONES_AREA, IconeWhatsApp } from '@/components/ui/Icones';
import { Revelar } from '@/components/ui/Revelar';
import { atuacao, contato } from '@/content/site';
import { ASSETS } from '@/lib/assets';
import { SLIDE_CARROSSEL } from '@/lib/carrossel';
import { cn } from '@/lib/utils';

/**
 * Áreas de atendimento — sete cards, um por área, mais o card de conversão.
 *
 * Cada card é um link inteiro (não um card com um link dentro): o alvo de
 * toque no mobile é o retângulo todo, e no teclado existe uma parada de foco
 * por área em vez de duas.
 *
 * NO MOBILE VIRA CARROSSEL. Empilhados, oito cards davam mais de quatro telas
 * de rolagem vertical no meio da página — a pessoa desistia antes de chegar em
 * "Quem sou". Deitados numa trilha com scroll-snap, a seção inteira cabe numa
 * tela e o gesto de arrastar é o mesmo do feed do Instagram dela. A partir de
 * `sm` o mesmo `<ul>` volta a ser grade (ver `CarrosselMobile`).
 *
 * O título usa o `TituloFlutuante` (GSAP + scrub, porte do
 * `almeida-imports-site`): as letras sobem esticadas e vão assentando
 * conforme a rolagem.
 */

/** Total de slides: as áreas mais o card "não achou a sua?". */
const TOTAL_SLIDES = atuacao.areas.length + 1;

export function Atuacao() {
  return (
    <section id="atuacao" className="relative overflow-hidden bg-osso py-24 md:py-32">
      {/* Estátua sangrando pela direita — dá profundidade sem competir com os cards. */}
      <Image
        src={ASSETS.estatua.src}
        alt=""
        width={ASSETS.estatua.width}
        height={ASSETS.estatua.height}
        aria-hidden="true"
        sizes="520px"
        className="pointer-events-none absolute -right-24 bottom-0 hidden w-[520px] opacity-[0.07] select-none xl:block"
      />

      <Container className="relative z-10">
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="sobrelinha mb-5">{atuacao.sobrelinha}</p>
            <TituloFlutuante
              texto={atuacao.titulo}
              as="h2"
              className="font-display text-[2rem] leading-[1.06] font-semibold tracking-tight text-tinta sm:text-5xl md:text-[3.25rem]"
            />
            <p className="font-serif text-[2.1rem] leading-[1.08] font-light text-ouro-600 italic sm:text-5xl md:text-[3.4rem]">
              {atuacao.tituloDestaque}
            </p>
          </div>

          <Revelar y={20} duracao={700} atraso={150}>
            <p className="max-w-md text-[15px] leading-relaxed font-light text-grafite md:pb-3">
              {atuacao.paragrafo}
            </p>
          </Revelar>
        </div>

        {/*
          No mobile a entrada é desta caixa, não de cada card — o scrollport da
          trilha recorta o observer dos filhos (ver globals.css). Acima de `sm`
          a regra `reveal-so-mobile` neutraliza esta camada e a cascata volta a
          ser card a card, como no resto da página.
        */}
        <Revelar y={26} duracao={700} className="reveal-so-mobile">
          <CarrosselMobile
            total={TOTAL_SLIDES}
            rotulo="Áreas de atendimento"
            dica="Arraste para o lado"
            className="sm:grid-cols-2 lg:grid-cols-3"
          >
            {atuacao.areas.map((area, i) => {
              const Icone = ICONES_AREA[area.slug as keyof typeof ICONES_AREA];
              const externo = area.href.startsWith('http');

              return (
                <Revelar
                  key={area.slug}
                  as="li"
                  y={26}
                  duracao={600}
                  /* Escalona por posição na grade, não por índice absoluto: na
                   grade de 3 colunas o atraso reinicia a cada linha, então a
                   última linha não espera 7 × 80ms para aparecer. */
                  atraso={(i % 3) * 90}
                  className={cn('group h-full', SLIDE_CARROSSEL)}
                >
                  <a
                    href={area.href}
                    {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex h-full flex-col rounded-[28px] border border-esmeralda-100 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-esmeralda-200 hover:shadow-[0_24px_60px_-28px_rgba(13,61,43,0.35)]"
                  >
                    <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-esmeralda-50 text-esmeralda-600 transition-all duration-500 group-hover:bg-esmeralda-800 group-hover:text-ouro-300">
                      <Icone className="h-7 w-7" aria-hidden="true" />
                    </span>

                    <h3 className="mb-3 font-display text-xl font-semibold text-tinta transition-colors group-hover:text-esmeralda-700">
                      {area.titulo}
                    </h3>

                    <p className="mb-6 text-[14px] leading-relaxed font-light text-grafite">
                      {area.texto}
                    </p>

                    <ul className="mt-auto flex flex-wrap gap-1.5">
                      {area.exemplos.map((exemplo) => (
                        <li
                          key={exemplo}
                          className="rounded-full bg-esmeralda-50 px-3 py-1 text-[11px] font-medium text-esmeralda-700"
                        >
                          {exemplo}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-7 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-ouro-600 uppercase">
                      Saiba mais
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </Revelar>
              );
            })}

            {/*
            São sete áreas numa grade de três colunas: a última linha sobraria
            com duas células vazias. Este card ocupa esse espaço e o transforma
            em conversão — é a pergunta que a pessoa faz quando não encontrou o
            próprio problema na lista. No carrossel ele é o último slide, que é
            exatamente onde a pergunta faz sentido: depois de ver todas.
          */}
            <Revelar
              as="li"
              y={26}
              duracao={600}
              atraso={90}
              className={cn('group h-full sm:col-span-2 lg:col-span-2', SLIDE_CARROSSEL)}
            >
              <a
                href={contato.whatsappAgendar}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-full flex-col justify-center overflow-hidden rounded-[28px] bg-esmeralda-900 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:bg-esmeralda-800 md:p-10"
              >
                <Image
                  src={ASSETS.monograma.src}
                  alt=""
                  width={ASSETS.monograma.width}
                  height={ASSETS.monograma.height}
                  aria-hidden="true"
                  sizes="200px"
                  className="pointer-events-none absolute -right-6 -bottom-10 w-44 opacity-[0.06] select-none"
                />

                <p className="sobrelinha sobrelinha-clara relative z-10 mb-4">Não achou a sua?</p>
                <h3 className="relative z-10 mb-3 max-w-md font-display text-2xl leading-snug font-semibold text-white">
                  Descreva o seu caso e eu digo se é da minha área.
                </h3>
                <p className="relative z-10 mb-7 max-w-md text-[14px] leading-relaxed font-light text-white/55">
                  Se não for, indico quem possa ajudar. Nenhuma das duas respostas custa nada.
                </p>

                <span className="relative z-10 inline-flex items-center gap-2.5 self-start rounded-full border border-ouro-500/60 px-6 py-3 text-[11px] font-bold tracking-[0.2em] text-ouro-300 uppercase transition-all duration-500 group-hover:border-ouro-400 group-hover:bg-ouro-500/10">
                  <IconeWhatsApp className="h-4 w-4" aria-hidden="true" />
                  Falar no WhatsApp
                </span>
              </a>
            </Revelar>
          </CarrosselMobile>
        </Revelar>
      </Container>
    </section>
  );
}
