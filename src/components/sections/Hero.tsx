import type { CSSProperties } from 'react';
import { getImageProps } from 'next/image';
import { ChevronRight } from 'lucide-react';
import { BotaoLink } from '@/components/ui/Botao';
import { IconeWhatsApp } from '@/components/ui/Icones';
import { contato, hero, marca } from '@/content/site';
import { ASSETS } from '@/lib/assets';

/** Abaixo disso entra o recorte vertical. Igual ao breakpoint `md` do Tailwind. */
const MEDIA_MOBILE = '(max-width: 767px)';
const MEDIA_DESKTOP = '(min-width: 768px)';

/**
 * Posição do elemento no stagger de entrada. A animação em si (`.hero-in`)
 * vive no globals.css; aqui só entra o atraso. Degraus de ~110ms — o bastante
 * para a cascata ser legível sem que o último elemento demore.
 */
const atraso = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties;

/**
 * Hero — bloco verde-escuro de altura de tela, com raio APENAS no canto inferior
 * esquerdo (a assinatura visual herdada de `lp-adv`: a curva "corta" a seção
 * escura e revela o branco por trás).
 *
 * É Server Component: nada aqui precisa de JS. A entrada dos elementos é
 * @keyframes puro disparado pela pintura — o <Revelar> com IntersectionObserver
 * não serviria, porque o hero já nasce na tela e não há o que observar.
 *
 * ART DIRECTION — o fundo é um <picture> com dois recortes da mesma imagem:
 * 16/9 no desktop, 1:2 no mobile. É <picture> e não duas <Image> escondidas
 * por classe porque o navegador baixa `<img>` mesmo dentro de `display: none`
 * — seriam dois downloads. Com <source media> ele resolve antes de pedir.
 *
 * `getImageProps` é o que mantém o otimizador do next/image nesse arranjo. Em
 * troca ele não emite o <link rel="preload"> que o `priority` daria — daí os
 * dois preloads manuais, cada um preso à sua media query.
 */
export function Hero() {
  const comum = {
    alt: ASSETS.heroFundo.alt,
    fill: true,
    priority: true,
    quality: 78,
    sizes: '100vw',
    className: 'hero-bg-in scale-[1.06] object-cover opacity-55',
  } as const;

  const {
    props: { srcSet: srcSetDesktop },
  } = getImageProps({ ...comum, src: ASSETS.heroFundo.src });

  const {
    props: { srcSet: srcSetMobile, ...propsImg },
  } = getImageProps({ ...comum, src: ASSETS.heroFundoMobile.src });

  return (
    <section
      id="inicio"
      className="relative flex min-h-[680px] items-center overflow-hidden bg-white md:h-screen"
    >
      <link
        rel="preload"
        as="image"
        media={MEDIA_DESKTOP}
        imageSrcSet={srcSetDesktop}
        imageSizes="100vw"
      />
      <link
        rel="preload"
        as="image"
        media={MEDIA_MOBILE}
        imageSrcSet={srcSetMobile}
        imageSizes="100vw"
      />

      <div className="absolute inset-0 z-0 overflow-hidden rounded-bl-[80px] bg-verde-950 md:rounded-bl-[200px]">
        <picture>
          <source media={MEDIA_DESKTOP} srcSet={srcSetDesktop} sizes="100vw" />
          <source media={MEDIA_MOBILE} srcSet={srcSetMobile} sizes="100vw" />
          {/* eslint-disable-next-line @next/next/no-img-element -- <picture> exige o <img> cru; o otimizador vem do getImageProps */}
          <img {...propsImg} alt={ASSETS.heroFundo.alt} fetchPriority="high" />
        </picture>

        {/* Duas camadas: a primeira escurece a esquerda para o texto ter
            contraste; a segunda tinge tudo de verde, para que a imagem
            (que é fria e azulada) pertença à paleta da marca. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-verde-950 via-verde-950/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-verde-900/45 mix-blend-multiply"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-20 md:py-0">
        <div className="max-w-2xl">
          <p className="hero-in sobrelinha sobrelinha-clara mb-7" style={atraso(0)}>
            {hero.sobrelinha}
          </p>

          {/* As duas linhas do H1 entram separadas — daí `block` no lugar do <br>.
              A segunda é Anton em caixa-alta dourada: é o contraste de peso
              que separa esta página de um template genérico. */}
          <h1 className="mb-7 text-white">
            <span
              className="hero-in block font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl md:text-[4.25rem]"
              style={atraso(110)}
            >
              {hero.tituloLinha1}
            </span>
            <span
              className="hero-in block font-destaque uppercase text-[2.8rem] leading-[1.05] text-ouro-400 sm:text-6xl md:text-[4.5rem]"
              style={atraso(220)}
            >
              {hero.tituloLinha2}
            </span>
          </h1>

          <p
            className="hero-in mb-9 max-w-xl text-[15px] leading-relaxed font-light text-white/65 md:text-[17px]"
            style={atraso(330)}
          >
            {hero.paragrafo}
          </p>

          {/* Os CTAs animam individualmente, não o wrapper: são itens de um
              flex container, portanto já blocados — o transform pega neles. */}
          <div className="flex flex-wrap items-center gap-6">
            <BotaoLink
              href={contato.whatsappAgendar}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-in border-verde-500! text-ouro-200! hover:border-verde-400! hover:text-white!"
              style={atraso(440)}
            >
              <IconeWhatsApp className="icone h-[18px] w-[18px]" aria-hidden="true" />
              {hero.cta}
            </BotaoLink>

            <a
              href="#atuacao"
              className="hero-in group inline-flex items-center gap-2 text-[13px] font-light tracking-wide text-white/65 underline-offset-4 transition-colors hover:text-white hover:underline"
              style={atraso(550)}
            >
              {hero.ctaSecundario}
              <ChevronRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>

          <div
            className="hero-in mt-12 flex flex-wrap items-center gap-x-6 gap-y-2"
            style={atraso(660)}
          >
            <p className="text-[12px] font-light text-white/40">{hero.legenda}</p>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 sm:block" />
            <p className="text-[12px] tracking-[0.2em] text-ouro-500/80 uppercase">{marca.oab}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
