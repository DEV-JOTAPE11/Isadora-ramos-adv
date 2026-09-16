'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { contato, navegacao } from '@/content/site';
import { ASSETS } from '@/lib/assets';
import { cn } from '@/lib/utils';
import { IconeWhatsApp } from '@/components/ui/Icones';

/**
 * Header fixo. Em repouso é transparente sobre o hero escuro; ao rolar ganha
 * o vidro verde (`.vidro-nav`).
 *
 * O estado de rolagem vem de um listener `passive` com guarda de igualdade:
 * `setRolado` só é chamado quando o booleano de fato muda, então a maior parte
 * dos eventos de scroll não custa nem um re-render.
 */
export function Header() {
  const [rolado, setRolado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolado((atual) => (window.scrollY > 24 !== atual ? !atual : atual));
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Trava a rolagem do corpo enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!menuAberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = anterior;
    };
  }, [menuAberto]);

  // Esc fecha o menu.
  useEffect(() => {
    if (!menuAberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuAberto(false);
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [menuAberto]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        rolado || menuAberto ? 'vidro-nav py-3' : 'bg-transparent py-5',
      )}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6"
      >
        <a href="#inicio" className="flex shrink-0 items-center gap-3" aria-label="Início">
          <Image
            src={ASSETS.logoCompleto.src}
            alt={ASSETS.logoCompleto.alt}
            width={ASSETS.logoCompleto.width}
            height={ASSETS.logoCompleto.height}
            priority
            sizes="180px"
            className={cn('h-auto w-[132px] transition-all duration-500 sm:w-[160px]')}
          />
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {navegacao.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative text-[13px] font-light tracking-wide text-white/75 transition-colors hover:text-ouro-300"
              >
                {item.rotulo}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={contato.whatsappAgendar}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2.5 rounded-full border border-verde-500/60 px-5 py-2.5 text-[11px] font-medium tracking-[0.16em] text-ouro-300 uppercase transition-all hover:border-verde-400 hover:bg-verde-500/10 sm:inline-flex"
          >
            <IconeWhatsApp className="h-4 w-4" aria-hidden="true" />
            Falar agora
          </a>

          <button
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            aria-expanded={menuAberto}
            aria-controls="menu-mobile"
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-verde-400 hover:text-ouro-300 lg:hidden"
          >
            {menuAberto ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/*
        O painel mobile fica sempre no DOM e anima por grid-template-rows, pelo
        mesmo motivo do acordeão: sem altura mágica e sem tirar os links da
        árvore de acessibilidade. `inert` desliga o foco quando está fechado.
      */}
      <div
        id="menu-mobile"
        inert={!menuAberto}
        className={cn(
          'grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[var(--ease-expo-out)] lg:hidden',
          menuAberto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <ul className="mx-auto max-w-7xl space-y-1 px-6 pt-6 pb-4">
            {navegacao.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuAberto(false)}
                  className="block border-b border-white/8 py-3.5 font-display text-lg font-light text-white/85 transition-colors hover:text-ouro-300"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href={contato.whatsappAgendar}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuAberto(false)}
                className="inline-flex items-center gap-2.5 rounded-full bg-verde-600 px-6 py-3 text-[12px] font-medium tracking-[0.16em] text-white uppercase"
              >
                <IconeWhatsApp className="h-4 w-4" aria-hidden="true" />
                Falar no WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
