import Image from 'next/image';
import { BotaoLink } from '@/components/ui/Botao';
import { Container } from '@/components/ui/Container';
import { IconeWhatsApp } from '@/components/ui/Icones';
import { Revelar } from '@/components/ui/Revelar';
import { contato, ctaIntermediario } from '@/content/site';
import { ASSETS } from '@/lib/assets';

/**
 * Faixa de conversão no meio da página, para quem já se convenceu e não quer
 * rolar até o fim.
 *
 * O texto evita urgência falsa ("últimas vagas", "não perca") — além de ser
 * vedado a advogado pelo Código de Ética da OAB, soaria como anúncio de
 * varejo justamente na seção que precisa soar como escritório.
 */
export function CtaIntermediario() {
  return (
    <section className="relative overflow-hidden bg-verde-800 py-20 md:py-24">
      <Image
        src={ASSETS.livros.src}
        alt=""
        width={ASSETS.livros.width}
        height={ASSETS.livros.height}
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14] select-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-verde-900 via-verde-800/85 to-verde-800/40"
      />

      <Container className="relative z-10">
        <Revelar y={26} duracao={750}>
          <div className="flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-[1.75rem] leading-[1.15] font-semibold text-white sm:text-[2.25rem] md:text-[2.5rem]">
                {ctaIntermediario.titulo}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-light text-white/60">
                {ctaIntermediario.paragrafo}
              </p>
            </div>

            <BotaoLink
              href={contato.whatsappAgendar}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 border-verde-400! bg-verde-500/10 text-ouro-200! hover:border-verde-300! hover:text-white!"
            >
              <IconeWhatsApp className="icone h-[18px] w-[18px]" aria-hidden="true" />
              {ctaIntermediario.cta}
            </BotaoLink>
          </div>
        </Revelar>
      </Container>
    </section>
  );
}
