'use client';

import { useEffect, useState } from 'react';
import { IconeWhatsApp } from '@/components/ui/Icones';
import { contato } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * Botão flutuante do WhatsApp — o mesmo que já existe no site atual.
 *
 * Só aparece depois de a pessoa passar do hero: na primeira dobra o CTA
 * principal já está na tela, e um segundo botão sobre ele seria ruído. A
 * guarda de igualdade no listener evita re-render a cada evento de scroll.
 */
export function BotaoFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => {
      const deveMostrar = window.scrollY > window.innerHeight * 0.7;
      setVisivel((atual) => (deveMostrar === atual ? atual : deveMostrar));
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <a
      href={contato.whatsappAgendar}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a advogada no WhatsApp"
      // `inert` enquanto escondido: o botão não recebe foco por Tab antes de
      // existir visualmente.
      inert={!visivel}
      className={cn(
        'pulso-verde fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-esmeralda-600 text-white shadow-[0_14px_34px_-8px_rgba(17,84,55,0.6)] transition-all duration-500 hover:bg-esmeralda-500 md:right-8 md:bottom-8 md:h-16 md:w-16',
        visivel
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-6 scale-90 opacity-0',
      )}
    >
      <IconeWhatsApp className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true" />
    </a>
  );
}
