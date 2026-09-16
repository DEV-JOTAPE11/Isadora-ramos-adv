import Image from 'next/image';
import { TituloDesfoque } from '@/components/effects/TituloDesfoque';
import { Container } from '@/components/ui/Container';
import { Indicador } from '@/components/ui/Indicador';
import { Revelar } from '@/components/ui/Revelar';
import { abertura, indicadores } from '@/content/site';
import { ASSETS } from '@/lib/assets';

/**
 * Primeira seção depois do hero — o "respiro" que faz a ponte entre a promessa
 * e as áreas de atuação. Mesmo papel da seção "Incerteza" no projeto
 * `alecsandra-resende-adv`: um bloco de texto longo, com peso, antes de a
 * página virar lista de serviços.
 *
 * O título usa o `TituloDesfoque` (GSAP + scrub, porte do
 * `almeida-imports-site`): os caracteres saem do desfoque conforme a rolagem
 * avança. Vale o custo do GSAP só nos títulos — o resto da página usa o
 * `.reveal` de CSS puro, que é bem mais barato.
 */
export function Abertura() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <TituloDesfoque
              texto={abertura.titulo}
              as="h2"
              className="mb-8 max-w-xl font-display text-[2rem] leading-[1.12] font-semibold tracking-tight text-tinta sm:text-[2.6rem] md:text-[3rem]"
            />

            <Revelar y={26} duracao={800}>
              <p className="max-w-2xl text-[16px] leading-[1.85] font-light text-grafite md:text-[17px]">
                {abertura.paragrafo}
              </p>

              <div className="mt-10 flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-12 bg-verde-500/60" />
                <div>
                  <p className="font-display text-xl font-medium text-verde-700">
                    {abertura.assinatura}
                  </p>
                  <p className="text-[11px] tracking-[0.24em] text-grafite-claro uppercase">
                    {abertura.assinaturaOab}
                  </p>
                </div>
              </div>
            </Revelar>
          </div>

          {/*
            Card com os indicadores. Os números são todos verificáveis (áreas
            atendidas, anos de formação) — nenhum "índice de êxito", que o
            Provimento 205/2021 da OAB veda em publicidade de advogado.
          */}
          <Revelar x={40} y={0} duracao={800} atraso={120}>
            <div className="relative overflow-hidden rounded-shell border border-verde-100 bg-verde-50 p-6 sm:p-9 md:p-10">
              <Image
                src={ASSETS.balanca.src}
                alt=""
                width={ASSETS.balanca.width}
                height={ASSETS.balanca.height}
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -right-10 w-44 opacity-[0.06] select-none"
              />

              <p className="relative z-10 font-display text-[1.45rem] leading-snug font-medium text-verde-800">
                Um escritório especializado em assessoria jurídica multidisciplinar.
              </p>

              <div className="filete-verde relative z-10 my-9" />

              <div className="relative z-10 flex items-start justify-between gap-2 sm:gap-4">
                {indicadores.map((ind, i) => (
                  <Indicador
                    key={ind.valor + ind.linha1}
                    valor={ind.valor}
                    linha1={ind.linha1}
                    linha2={ind.linha2}
                    indice={i}
                  />
                ))}
              </div>
            </div>
          </Revelar>
        </div>
      </Container>
    </section>
  );
}
