import Image from 'next/image';
import { TituloDesfoque } from '@/components/effects/TituloDesfoque';
import { Container } from '@/components/ui/Container';
import { Revelar } from '@/components/ui/Revelar';
import { compromissos } from '@/content/site';
import { ASSETS } from '@/lib/assets';

/**
 * Ocupa a posição que, no projeto `alecsandra-resende-adv`, é dos depoimentos.
 *
 * O site atual da Dra. Isadora tem uma seção de depoimentos preenchida com
 * "Lorem ipsum" e assinada por "John Doe" — o template nunca foi completado.
 * Publicar depoimentos inventados seria propaganda enganosa e infração ao
 * Provimento 205/2021 do Conselho Federal da OAB, então o espaço recebe os
 * compromissos do escritório, que têm lastro em texto real do site e da bio
 * do Instagram.
 *
 * Quando houver avaliações verdadeiras, preencha `depoimentos` em
 * `src/content/site.ts` e ligue `config.exibirDepoimentos`: o <Depoimentos>
 * entra no lugar desta seção sem mexer em mais nada.
 */
export function Compromissos() {
  return (
    <section className="relative overflow-hidden bg-verde-950 py-24 md:py-32">
      <Image
        src={ASSETS.texturaBiblioteca.src}
        alt=""
        width={ASSETS.texturaBiblioteca.width}
        height={ASSETS.texturaBiblioteca.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16] select-none"
      />

      <Container className="relative z-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="sobrelinha sobrelinha-clara mb-5 justify-center">
            {compromissos.sobrelinha}
          </p>
          <TituloDesfoque
            texto={compromissos.titulo}
            as="h2"
            className="font-display text-[2rem] leading-[1.06] font-semibold tracking-tight text-white sm:text-5xl md:text-[3.25rem]"
          />
          <p className="font-destaque uppercase text-[2.1rem] leading-[1.08] text-ouro-400 sm:text-5xl md:text-[3.4rem]">
            {compromissos.tituloDestaque}
          </p>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {compromissos.itens.map((item, i) => (
            <Revelar
              key={item.titulo}
              as="li"
              y={28}
              duracao={650}
              atraso={i * 110}
              className="group relative overflow-hidden rounded-[26px] border border-white/8 bg-white/[0.035] p-8 transition-all duration-500 hover:border-verde-500/35 hover:bg-white/[0.06]"
            >
              {/* Numeração grande e translúcida — dá hierarquia ao card sem
                  precisar de mais um ícone. */}
              <span
                aria-hidden="true"
                className="absolute -top-3 right-4 font-display text-[5.5rem] leading-none font-bold text-white/[0.035] transition-colors duration-500 group-hover:text-ouro-500/10"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="relative z-10 mb-3.5 font-display text-lg font-semibold text-ouro-300">
                {item.titulo}
              </h3>
              <p className="relative z-10 text-[14px] leading-relaxed font-light text-white/55">
                {item.texto}
              </p>
            </Revelar>
          ))}
        </ul>
      </Container>
    </section>
  );
}
