/**
 * Catálogo de imagens. Centralizar `src`, dimensões e `alt` num lugar só evita
 * texto alternativo improvisado na hora de escrever a seção, e dá um lugar
 * óbvio para registrar a procedência de cada arquivo.
 *
 * PROCEDÊNCIA
 * - `isadora*`, `logoCompleto`, `monograma`: material da própria advogada
 *   (perfil @isadoraramosadv e isadoraramos.adv.br).
 * - `heroFundo`, `heroFundoMobile`, `estatua`, `balanca`: banco de imagens
 *   reaproveitado do projeto `lp-adv`.
 * - `secao*` e `textura*`: geradas por `scripts/preparar-imagens.mjs` — fotos
 *   do Pexels tratadas na paleta esmeralda, e uma textura procedural.
 *
 * NOTA: as imagens de fundo que vinham de `alecsandra-resende-adv` foram
 * removidas de propósito. Eram retratos da Dra. Alecsandra Resende e uma arte
 * com placa de "Dr. Marcos Polirsa" — material de outro escritório, que não
 * pode aparecer na página da Dra. Isadora.
 */
export const ASSETS = {
  heroFundo: {
    src: '/images/hero-justica.webp',
    alt: 'Estátua da Justiça em contraluz',
    width: 1600,
    height: 900,
  },
  heroFundoMobile: {
    src: '/images/hero-mobile-adv.webp',
    alt: 'Estátua da Justiça em contraluz',
    width: 720,
    height: 1440,
  },
  isadoraRetrato: {
    src: '/images/isadora-retrato.webp',
    alt: 'Dra. Isadora Ramos, advogada — OAB/MG 238.197',
    width: 820,
    height: 2111,
  },
  logoCompleto: {
    src: '/images/logo-isadora-ramos.webp',
    alt: 'Isadora Ramos — Advocacia e Consultoria Jurídica',
    width: 900,
    height: 471,
  },
  monograma: {
    src: '/images/monograma-ir.webp',
    alt: '',
    width: 397,
    height: 440,
  },
  balanca: {
    src: '/images/balanca.webp',
    alt: '',
    width: 600,
    height: 600,
  },
  /** Arte do card "Incerteza", trazida de `alecsandra-resende-adv` (genérica, sem nome de escritório). */
  balancaDignidade: {
    src: '/images/balanca-dignidade.webp',
    alt: 'Estátua dourada da Justiça com a inscrição Direito e Dignidade',
    width: 1404,
    height: 1191,
  },
  estatua: {
    src: '/images/estatua-turquesa.webp',
    alt: '',
    width: 1000,
    height: 1000,
  },
  atendimento: {
    src: '/images/secao-atendimento.webp',
    alt: 'Advogada em atendimento, conversando com um cliente',
    width: 1200,
    height: 800,
  },
  assinatura: {
    src: '/images/secao-assinatura.webp',
    alt: 'Assinatura de um contrato sobre a mesa do escritório',
    width: 1200,
    height: 800,
  },
  livros: {
    src: '/images/secao-livros.webp',
    alt: '',
    width: 1600,
    height: 900,
  },
  texturaBiblioteca: {
    src: '/images/textura-biblioteca.webp',
    alt: '',
    width: 1600,
    height: 900,
  },
  texturaEsmeralda: {
    src: '/images/textura-esmeralda.webp',
    alt: '',
    width: 1400,
    height: 900,
  },
} as const;
