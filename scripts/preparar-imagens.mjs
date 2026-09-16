/**
 * Prepara os assets de imagem do site.
 *
 * Roda uma vez, com as fontes já baixadas em `scripts/_fontes/`. Os arquivos
 * gerados vão versionados em `public/images/`, então o script existe como
 * documentação de COMO cada imagem foi produzida — não faz parte do build.
 *
 *   node scripts/preparar-imagens.mjs
 *
 * PROCEDÊNCIA DAS FONTES
 * - Fotos: Pexels (licença Pexels — uso comercial livre, sem atribuição
 *   obrigatória). O id de cada foto está no nome do arquivo de origem.
 * - Texturas `textura-*`: geradas aqui mesmo, procedurais. Ver `gerarTextura`.
 *
 * Por que reprocessar em vez de usar as fotos cruas: todas passam por
 * dessaturação + tinta esmeralda, para que uma foto de banco de imagens
 * pertença à paleta da marca em vez de parecer colada por cima dela.
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const FONTES = path.join(import.meta.dirname, '_fontes');
const SAIDA = path.join(import.meta.dirname, '..', 'public', 'images');

/** Esmeralda-900 da paleta (ver globals.css). */
const ESMERALDA = { r: 8, g: 38, b: 26 };

/**
 * Aplica o tratamento padrão: recorte, dessaturação parcial e um véu
 * esmeralda em `multiply`. `veu` é a opacidade do véu, de 0 a 1.
 */
async function tratar(origem, destino, { largura, altura, saturacao, veu, brilho = 1 }) {
  const base = sharp(path.join(FONTES, origem))
    .resize(largura, altura, { fit: 'cover', position: 'attention' })
    .modulate({ saturation: saturacao, brightness: brilho });

  const tinta = await sharp({
    create: {
      width: largura,
      height: altura,
      channels: 4,
      background: { ...ESMERALDA, alpha: veu },
    },
  })
    .png()
    .toBuffer();

  await base
    .composite([{ input: tinta, blend: 'over' }])
    .webp({ quality: 82 })
    .toFile(path.join(SAIDA, destino));

  console.log('✓', destino);
}

/**
 * Textura procedural: ruído monocromático fino sobre o esmeralda da marca,
 * com vinheta radial. Substitui as fotos de fundo que vinham de outros
 * projetos — uma textura gerada nunca é o retrato de outra pessoa, pesa ~10 kB
 * e casa com a paleta por construção.
 */
async function gerarTextura(destino, { largura, altura, intensidade, semente }) {
  const canais = 3;
  const pixels = Buffer.alloc(largura * altura * canais);

  // PRNG determinístico (mulberry32) — a mesma semente dá sempre a mesma
  // textura, então regerar o asset não produz diff de imagem sem motivo.
  let estado = semente >>> 0;
  const aleatorio = () => {
    estado = (estado + 0x6d2b79f5) >>> 0;
    let t = estado;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const cx = largura / 2;
  const cy = altura / 2;
  const raioMax = Math.hypot(cx, cy);

  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      const i = (y * largura + x) * canais;

      // Vinheta: o centro é mais claro, as bordas afundam no escuro.
      const d = Math.hypot(x - cx, y - cy) / raioMax;
      const vinheta = 1 - d * 0.85;

      const ruido = (aleatorio() - 0.5) * intensidade;
      const f = Math.max(0, vinheta + ruido);

      pixels[i] = Math.min(255, Math.round(ESMERALDA.r + f * 46));
      pixels[i + 1] = Math.min(255, Math.round(ESMERALDA.g + f * 58));
      pixels[i + 2] = Math.min(255, Math.round(ESMERALDA.b + f * 50));
    }
  }

  await sharp(pixels, { raw: { width: largura, height: altura, channels: canais } })
    // O blur suaviza o ruído de pixel único em um grão de filme, que é o que
    // se quer — ruído cru vira moiré quando o navegador reescala a imagem.
    .blur(0.7)
    .webp({ quality: 74 })
    .toFile(path.join(SAIDA, destino));

  console.log('✓', destino);
}

await mkdir(SAIDA, { recursive: true });

// Fundo do CTA intermediário — estantes de livros, bem escurecidas.
await tratar('pexels-15612066-estante.jpg', 'secao-livros.webp', {
  largura: 1600,
  altura: 900,
  saturacao: 0.35,
  brilho: 0.72,
  veu: 0.45,
});

// "Por que escolher" — atendimento, a única foto com pessoas da página.
await tratar('pexels-36765718-atendimento.jpg', 'secao-atendimento.webp', {
  largura: 1200,
  altura: 800,
  saturacao: 0.62,
  veu: 0.18,
});

// Contato — assinatura de contrato sobre mesa escura.
await tratar('pexels-261621-assinatura.jpg', 'secao-assinatura.webp', {
  largura: 1200,
  altura: 800,
  saturacao: 0.4,
  brilho: 0.92,
  veu: 0.22,
});

// Compromissos — leitura em biblioteca jurídica, como textura de fundo.
await tratar('pexels-17548877-biblioteca.jpg', 'textura-biblioteca.webp', {
  largura: 1600,
  altura: 900,
  saturacao: 0.3,
  brilho: 0.6,
  veu: 0.55,
});

// "Quem sou" — textura procedural: o retrato já carrega a seção, o fundo só
// precisa de grão.
await gerarTextura('textura-esmeralda.webp', {
  largura: 1400,
  altura: 900,
  intensidade: 0.16,
  semente: 20260916,
});
