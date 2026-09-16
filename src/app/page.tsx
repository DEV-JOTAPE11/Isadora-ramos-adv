import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Abertura } from '@/components/sections/Abertura';
import { Atuacao } from '@/components/sections/Atuacao';
import { Compromissos } from '@/components/sections/Compromissos';
import { Contato } from '@/components/sections/Contato';
import { CtaIntermediario } from '@/components/sections/CtaIntermediario';
import { Depoimentos } from '@/components/sections/Depoimentos';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { PorQue } from '@/components/sections/PorQue';
import { Processo } from '@/components/sections/Processo';
import { Sobre } from '@/components/sections/Sobre';
import { BotaoFlutuante } from '@/components/ui/BotaoFlutuante';
import { config } from '@/content/site';

/**
 * Ordem das seções — a mesma do projeto `alecsandra-resende-adv`:
 *
 *   hero → abertura → serviços → sobre → por que → CTA → processo →
 *   prova social → CTA final → FAQ → rodapé
 *
 * A lógica é alternar bloco claro e bloco escuro, e nunca deixar mais de duas
 * seções entre um CTA e o próximo.
 *
 * A prova social sai de `Compromissos` enquanto não houver avaliações reais
 * (ver o comentário em `config.exibirDepoimentos`).
 */
export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-esmeralda-800 focus:px-6 focus:py-3 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Abertura />
        <Atuacao />
        <Sobre />
        <PorQue />
        <CtaIntermediario />
        <Processo />
        {config.exibirDepoimentos ? <Depoimentos /> : <Compromissos />}
        <Faq />
        <Contato />
      </main>

      <Footer />
      <BotaoFlutuante />
    </>
  );
}
