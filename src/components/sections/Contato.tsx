import Image from 'next/image';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { TituloDesfoque } from '@/components/effects/TituloDesfoque';
import { BotaoLink } from '@/components/ui/Botao';
import { Container } from '@/components/ui/Container';
import { IconeInstagram, IconeWhatsApp } from '@/components/ui/Icones';
import { Revelar } from '@/components/ui/Revelar';
import { contato, ctaFinal, mapsEmbed } from '@/content/site';
import { ASSETS } from '@/lib/assets';

/**
 * Contato + CTA final.
 *
 * Sem formulário de propósito: o canal real do escritório é o WhatsApp (é o
 * link que está na bio do Instagram e o botão principal do site atual). Um
 * formulário aqui exigiria backend, tratamento de dados pessoais sob a LGPD e
 * alguém conferindo a caixa de entrada — três pontos de falha para substituir
 * um canal que já funciona. Se um dia for preciso, este é o lugar.
 *
 * O mapa é um <iframe> com `loading="lazy"`: fica fora do caminho crítico e
 * só baixa quando chega perto da viewport.
 */
export function Contato() {
  const { endereco } = contato;
  const enderecoCompleto = `${endereco.linha} — ${endereco.bairro}, ${endereco.cidade}/${endereco.uf}, CEP ${endereco.cep}`;

  const canais = [
    {
      Icone: Phone,
      rotulo: 'Telefone',
      valor: contato.telefoneExibicao,
      href: `tel:${contato.telefoneE164}`,
    },
    {
      Icone: IconeWhatsApp,
      rotulo: 'WhatsApp',
      valor: contato.telefoneExibicao,
      href: contato.whatsappAgendar,
      externo: true,
    },
    {
      Icone: Mail,
      rotulo: 'E-mail',
      valor: contato.email,
      href: `mailto:${contato.email}`,
    },
    {
      Icone: IconeInstagram,
      rotulo: 'Instagram',
      valor: '@isadoraramosadv',
      href: contato.instagram,
      externo: true,
    },
  ];

  return (
    <section id="contato" className="relative overflow-hidden bg-osso py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* CTA final */}
          <div>
            <p className="sobrelinha mb-5">{ctaFinal.sobrelinha}</p>

            <TituloDesfoque
              texto={ctaFinal.titulo}
              as="h2"
              className="font-display text-[2.1rem] leading-[1.06] font-semibold tracking-tight text-tinta sm:text-5xl md:text-[3.25rem]"
            />

            <Revelar y={22} duracao={720} atraso={120}>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed font-light text-grafite">
                {ctaFinal.paragrafo}
              </p>

              <BotaoLink
                href={contato.whatsappAgendar}
                target="_blank"
                rel="noopener noreferrer"
                variante="solido"
                className="mt-9"
              >
                <IconeWhatsApp className="icone h-[18px] w-[18px]" aria-hidden="true" />
                {ctaFinal.cta}
              </BotaoLink>
            </Revelar>

            <Revelar y={24} duracao={720} atraso={180}>
              <div className="relative mt-12 overflow-hidden rounded-[28px]">
                <Image
                  src={ASSETS.assinatura.src}
                  alt={ASSETS.assinatura.alt}
                  width={ASSETS.assinatura.width}
                  height={ASSETS.assinatura.height}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="h-[220px] w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-verde-900/40 mix-blend-multiply"
                />
              </div>
            </Revelar>
          </div>

          {/* canais + endereço + mapa */}
          <Revelar x={34} y={0} duracao={820} atraso={100}>
            <div className="rounded-[32px] border border-verde-100 bg-white p-8 md:p-10">
              <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                {canais.map(({ Icone, rotulo, valor, href, externo }) => (
                  <li key={rotulo}>
                    <p className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.26em] text-ouro-600 uppercase">
                      <Icone className="h-4 w-4" aria-hidden="true" />
                      {rotulo}
                    </p>
                    <a
                      href={href}
                      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[15px] font-light break-all text-grafite transition-colors hover:text-verde-700"
                    >
                      {valor}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="filete-verde my-9" />

              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.26em] text-ouro-600 uppercase">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    Escritório
                  </p>
                  <address className="text-[15px] leading-relaxed font-light text-grafite not-italic">
                    {endereco.linha}
                    <br />
                    {endereco.bairro} — {endereco.cidade}/{endereco.uf}
                    <br />
                    CEP {endereco.cep}
                  </address>
                </div>

                <div>
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.26em] text-ouro-600 uppercase">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    Atendimento
                  </p>
                  <p className="text-[15px] leading-relaxed font-light text-grafite">
                    Segunda a sexta
                    <br />
                    8h às 18h
                    <br />
                    <span className="text-grafite-claro">Presencial e online</span>
                  </p>
                </div>
              </div>

              <div className="mt-9 overflow-hidden rounded-[22px] border border-verde-100">
                <iframe
                  src={mapsEmbed}
                  title={`Mapa — ${enderecoCompleto}`}
                  aria-label={`Mapa do escritório: ${enderecoCompleto}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[260px] w-full border-0 grayscale-[0.35]"
                />
              </div>
            </div>
          </Revelar>
        </div>
      </Container>
    </section>
  );
}
