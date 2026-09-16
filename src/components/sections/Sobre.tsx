import Image from 'next/image';
import { TituloDesfoque } from '@/components/effects/TituloDesfoque';
import { BotaoLink } from '@/components/ui/Botao';
import { Container } from '@/components/ui/Container';
import { IconeWhatsApp } from '@/components/ui/Icones';
import { Revelar } from '@/components/ui/Revelar';
import { contato, marca, sobre } from '@/content/site';
import { ASSETS } from '@/lib/assets';

/**
 * "Quem sou" — o retrato e a biografia.
 *
 * Fundo esmeralda escuro de propósito: o retrato da Dra. Isadora já foi
 * fotografado sobre verde (é o padrão do Instagram dela), então o recorte
 * funde com a seção em vez de aparecer como um selo colado. É também o
 * contraponto escuro no meio de uma página clara — a página inteira alterna
 * claro/escuro para marcar o ritmo.
 */
export function Sobre() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-esmeralda-950 py-24 md:py-32">
      {/* Textura de fundo, quase imperceptível: tira o chapado do bloco escuro. */}
      <Image
        src={ASSETS.texturaEsmeralda.src}
        alt=""
        width={ASSETS.texturaEsmeralda.width}
        height={ASSETS.texturaEsmeralda.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] select-none"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* retrato */}
          <Revelar
            x={-34}
            y={0}
            escala={0.96}
            duracao={900}
            className="relative mx-auto max-w-sm lg:mx-0"
          >
            <div className="relative">
              {/* Moldura dourada deslocada — o truque clássico de retrato de
                  escritório. Puro CSS, sem imagem extra. */}
              <span
                aria-hidden="true"
                className="absolute -top-4 -left-4 h-full w-full rounded-[28px] border border-ouro-500/35"
              />
              <div className="relative overflow-hidden rounded-[28px] bg-esmeralda-900">
                <Image
                  src={ASSETS.isadoraRetrato.src}
                  alt={ASSETS.isadoraRetrato.alt}
                  width={ASSETS.isadoraRetrato.width}
                  height={ASSETS.isadoraRetrato.height}
                  sizes="(min-width: 1024px) 420px, 320px"
                  className="h-auto w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-esmeralda-950 to-transparent"
                />
              </div>

              <div className="absolute inset-x-6 bottom-6 text-center">
                <p className="font-serif text-xl font-light text-ouro-300 italic">
                  {marca.tratamento}
                </p>
                <p className="mt-1 text-[10px] tracking-[0.3em] text-white/45 uppercase">
                  {marca.oab}
                </p>
              </div>
            </div>
          </Revelar>

          {/* biografia */}
          <div>
            <p className="sobrelinha sobrelinha-clara mb-5">{sobre.sobrelinha}</p>

            <TituloDesfoque
              texto={sobre.tituloPrefixo.trim()}
              as="h2"
              className="font-display text-[2rem] leading-[1.06] font-semibold tracking-tight text-white sm:text-5xl md:text-[3.25rem]"
            />
            <p className="mb-8 font-serif text-[2.1rem] leading-[1.08] font-light text-ouro-400 italic sm:text-5xl md:text-[3.4rem]">
              {sobre.tituloDestaque}
            </p>

            <div className="space-y-5">
              {sobre.paragrafos.map((paragrafo, i) => (
                <Revelar key={i} y={22} duracao={700} atraso={i * 90}>
                  <p className="max-w-2xl text-[15px] leading-[1.85] font-light text-white/60 md:text-[16px]">
                    {paragrafo}
                  </p>
                </Revelar>
              ))}
            </div>

            {/* Credenciais em grade: a trajetória lida de relance, sem precisar
                garimpar os parágrafos acima. */}
            <Revelar y={24} duracao={700} atraso={200}>
              <dl className="mt-10 grid gap-x-8 gap-y-5 border-t border-white/8 pt-8 sm:grid-cols-2">
                {sobre.credenciais.map((cred, i) => (
                  <div key={i}>
                    <dt className="text-[10px] font-bold tracking-[0.28em] text-ouro-500 uppercase">
                      {cred.rotulo}
                    </dt>
                    <dd className="mt-1.5 text-[14px] font-light text-white/75">{cred.valor}</dd>
                  </div>
                ))}
              </dl>
            </Revelar>

            <Revelar y={20} duracao={700} atraso={280}>
              <blockquote className="mt-10 border-l-2 border-ouro-500/50 pl-6">
                <p className="font-serif text-lg leading-snug font-light text-ouro-200 italic md:text-xl">
                  “{sobre.citacao}”
                </p>
              </blockquote>

              <BotaoLink
                href={contato.whatsappAgendar}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 border-ouro-500! text-ouro-200! hover:border-ouro-400! hover:text-white!"
              >
                <IconeWhatsApp className="icone h-[18px] w-[18px]" aria-hidden="true" />
                {sobre.cta}
              </BotaoLink>
            </Revelar>
          </div>
        </div>
      </Container>
    </section>
  );
}
