import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    /*
     * A partir do Next 16 toda `quality` usada precisa estar declarada aqui.
     * 78 é a do fundo do hero: é uma foto escura e desfocada sob dois véus,
     * onde a diferença para 80+ não aparece e o arquivo encolhe.
     */
    qualities: [78, 80, 90],
  },
};

export default nextConfig;
