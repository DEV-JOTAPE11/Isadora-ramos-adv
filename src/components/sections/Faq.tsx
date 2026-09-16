import { TituloFlutuante } from '@/components/effects/TituloFlutuante';
import { Acordeao } from '@/components/ui/Acordeao';
import { BotaoLink } from '@/components/ui/Botao';
import { Container } from '@/components/ui/Container';
import { IconeWhatsApp } from '@/components/ui/Icones';
import { Revelar } from '@/components/ui/Revelar';
import { contato, faq } from '@/content/site';

/**
 * Perguntas frequentes.
 *
 * O JSON-LD `FAQPage` vai daqui, e não do layout, para ficar ao lado do texto
 * que ele descreve: se uma pergunta mudar em `site.ts`, os dois mudam juntos,
 * sem chance de o rich snippet ficar anunciando resposta antiga.
 */
export function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.itens.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: item.resposta },
    })),
  };

  return (
    <section id="faq" className="overflow-hidden bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="sobrelinha mb-5">{faq.sobrelinha}</p>

            <TituloFlutuante
              texto={faq.titulo}
              as="h2"
              className="font-display text-[2rem] leading-[1.06] font-semibold tracking-tight text-tinta sm:text-5xl md:text-[3.25rem]"
            />
            <p className="font-destaque uppercase text-[2.1rem] leading-[1.08] text-ouro-600 sm:text-5xl md:text-[3.4rem]">
              {faq.tituloDestaque}
            </p>

            <Revelar y={22} duracao={700} atraso={140}>
              <p className="mt-7 max-w-sm text-[15px] leading-relaxed font-light text-grafite">
                Não encontrou a sua dúvida? Me chame no WhatsApp e pergunte diretamente — respondo
                pessoalmente.
              </p>

              <BotaoLink
                href={contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                variante="solido"
                className="mt-8"
              >
                <IconeWhatsApp className="icone h-[18px] w-[18px]" aria-hidden="true" />
                Tirar uma dúvida
              </BotaoLink>
            </Revelar>
          </div>

          <Revelar y={26} duracao={800} atraso={100}>
            <Acordeao itens={faq.itens} />
          </Revelar>
        </div>
      </Container>

      <script
        type="application/ld+json"
        // JSON-LD estático, montado a partir de `site.ts` — sem entrada do usuário
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
