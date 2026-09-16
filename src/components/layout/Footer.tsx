import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { IconeInstagram, IconeWhatsApp } from '@/components/ui/Icones';
import { atuacao, contato, marca, navegacao, rodape } from '@/content/site';
import { ASSETS } from '@/lib/assets';

const ANO = new Date().getFullYear();

export function Footer() {
  const { endereco } = contato;

  return (
    <footer className="relative overflow-hidden bg-verde-950 text-white">
      {/* Monograma gigante ao fundo, cortado pela borda — assinatura discreta. */}
      <Image
        src={ASSETS.monograma.src}
        alt=""
        width={ASSETS.monograma.width}
        height={ASSETS.monograma.height}
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-20 w-[320px] opacity-[0.045] select-none md:w-[440px]"
      />

      <Container className="relative z-10 py-20">
        {/*
          Quatro colunas, e não três: com "Navegação" e "Atuação" empilhadas na
          mesma coluna, a do meio ficava quase o dobro da altura das vizinhas e
          o rodapé abria um vazio embaixo da marca.
        */}
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src={ASSETS.logoCompleto.src}
              alt={ASSETS.logoCompleto.alt}
              width={ASSETS.logoCompleto.width}
              height={ASSETS.logoCompleto.height}
              sizes="220px"
              className="h-auto w-[196px]"
            />
            <p className="mt-6 max-w-xs font-display text-lg leading-snug font-medium text-ouro-300">
              {marca.tagline}.
            </p>
            <p className="mt-5 text-[13px] tracking-[0.18em] text-white/45 uppercase">
              {marca.oab}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/70 transition-all hover:border-verde-400 hover:text-verde-300"
              >
                <IconeWhatsApp className="h-[18px] w-[18px]" />
              </a>
              <a
                href={contato.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/70 transition-all hover:border-verde-400 hover:text-ouro-300"
              >
                <IconeInstagram className="h-[18px] w-[18px]" />
              </a>
            </div>

            <p className="mt-8 text-[13px] leading-relaxed font-light text-white/40">
              Atendimento de segunda a sexta, das 8h às 18h.
              <br />
              Presencial em Arinos/MG e online para todo o Brasil.
            </p>
          </div>

          {/* navegação + áreas */}
          <nav aria-label="Rodapé">
            <p className="mb-5 text-[11px] font-bold tracking-[0.3em] text-ouro-500 uppercase">
              Navegação
            </p>
            <ul className="space-y-2.5">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[14px] font-light text-white/60 transition-colors hover:text-ouro-300"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.3em] text-ouro-500 uppercase">
              Atuação
            </p>
            <ul className="space-y-2.5">
              {atuacao.areas.map((area) => (
                <li key={area.slug}>
                  <a
                    href="#atuacao"
                    className="text-[14px] font-light text-white/60 transition-colors hover:text-ouro-300"
                  >
                    {area.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contato */}
          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.3em] text-ouro-500 uppercase">
              Contato
            </p>

            <ul className="space-y-5 text-[14px] font-light text-white/60">
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-ouro-500" aria-hidden="true" />
                <a
                  href={`tel:${contato.telefoneE164}`}
                  className="transition-colors hover:text-ouro-300"
                >
                  {contato.telefoneExibicao}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-ouro-500" aria-hidden="true" />
                <a
                  href={`mailto:${contato.email}`}
                  className="break-all transition-colors hover:text-ouro-300"
                >
                  {contato.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-ouro-500" aria-hidden="true" />
                <address className="not-italic">
                  {endereco.linha}
                  <br />
                  {endereco.bairro} — {endereco.cidade}/{endereco.uf}
                  <br />
                  CEP {endereco.cep}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="filete-verde my-12" />

        {/* Aviso da OAB: o site é informativo, não é anúncio de captação. */}
        <p className="max-w-4xl text-[12px] leading-relaxed font-light text-white/35">
          {rodape.aviso}
        </p>

        <div className="mt-8 flex flex-col gap-2 text-[12px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ANO} {marca.escritorio}. Todos os direitos reservados.
          </p>
          <p>
            {marca.advogada} — {marca.oab}
          </p>
        </div>
      </Container>
    </footer>
  );
}
