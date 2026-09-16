import type { Metadata, Viewport } from 'next';
import { Anton, Barlow, Barlow_Condensed } from 'next/font/google';
import { contato, marca, seo } from '@/content/site';
import './globals.css';

/*
 * TRIO TIPOGRÁFICO DO PROJETO `Fruity-main`:
 *   Barlow Condensed → títulos (condensada, firme, moderna)
 *   Barlow           → corpo de texto e interface
 *   Anton            → destaques em caixa-alta (a 2ª linha dos títulos)
 *
 * Barlow e Barlow Condensed não são variáveis no Google Fonts: cada peso é um
 * arquivo, então só entram os pesos que a página usa. O @font-face só baixa a
 * face que algum texto de fato renderiza.
 */
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--fonte-barlow-condensed',
  display: 'swap',
  preload: true, // fonte do H1 do hero
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--fonte-barlow',
  display: 'swap',
  preload: true, // o parágrafo do hero costuma ser o elemento LCP
});

/* Anton só existe no peso 400 — é a face de impacto dos destaques. */
const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--fonte-anton',
  display: 'swap',
  preload: true, // 2ª linha do H1 do hero
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.canonical),
  title: {
    default: seo.titulo,
    template: `%s | ${marca.nomeCurto}`,
  },
  description: seo.descricao,
  applicationName: marca.escritorio,
  authors: [{ name: marca.advogada }],
  creator: marca.advogada,
  keywords: [
    'advogada Arinos MG',
    'advocacia Arinos',
    'direito previdenciário Arinos',
    'direito de família',
    'direito sucessório',
    'inventário',
    'usucapião',
    'direito imobiliário rural',
    'direito tributário',
    'Isadora Ramos advogada',
    'OAB/MG 238.197',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: seo.canonical,
    siteName: marca.escritorio,
    title: seo.titulo,
    description: seo.descricao,
    images: [{ url: seo.ogImage, width: 820, height: 2111, alt: marca.tratamento }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.titulo,
    description: seo.descricao,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0d07',
};

const ENDERECO = {
  '@type': 'PostalAddress',
  streetAddress: contato.endereco.linha,
  addressLocality: contato.endereco.cidade,
  addressRegion: contato.endereco.uf,
  postalCode: contato.endereco.cep,
  addressCountry: contato.endereco.pais,
} as const;

/**
 * JSON-LD `Attorney` (subtipo de LegalService). É o que faz o Google mostrar
 * telefone, endereço e horário no painel de conhecimento local — item caro
 * para um escritório de cidade pequena, onde a busca é quase toda local.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Attorney',
      '@id': `${seo.canonical}#escritorio`,
      name: marca.escritorio,
      alternateName: marca.nomeCurto,
      description: seo.descricao,
      url: seo.canonical,
      image: `${seo.canonical}images/isadora-retrato.webp`,
      logo: `${seo.canonical}images/logo-isadora-ramos.webp`,
      telephone: contato.telefoneE164,
      email: contato.email,
      priceRange: '$$',
      address: ENDERECO,
      areaServed: [
        { '@type': 'City', name: 'Arinos' },
        { '@type': 'State', name: 'Minas Gerais' },
        { '@type': 'Country', name: 'BR' },
      ],
      sameAs: [contato.instagram],
      founder: {
        '@type': 'Person',
        name: marca.advogada,
        honorificPrefix: 'Dra.',
        jobTitle: 'Advogada',
        identifier: marca.oab,
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Faculdade CNEC Unaí' },
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      knowsAbout: [
        'Direito Previdenciário',
        'Direito de Família',
        'Direito Sucessório',
        'Direito Imobiliário',
        'Direito Cível',
        'Direito Tributário',
        'Direito Empresarial',
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${barlowCondensed.variable} ${barlow.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white">
        {/*
          Marca que o JS está ativo, ANTES da primeira pintura. Só então o CSS
          esconde os blocos de `.reveal`. Sem isso, uma falha no bundle deixaria
          a página inteira em opacity: 0 — e rastreadores sem JS veriam o mesmo.
        */}
        <script
          // string estática, sem entrada do usuário
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js')` }}
        />

        {children}

        <script
          type="application/ld+json"
          // JSON-LD estático, sem entrada do usuário
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
