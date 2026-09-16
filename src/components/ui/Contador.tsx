'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Valor com prefixo/sufixo, ex.: "+200", "7" ou "100%". */
  valor: string;
  /** Duração total da contagem em ms. */
  duracao?: number;
  /** Atraso antes de começar, em ms. */
  atraso?: number;
  className?: string;
};

/**
 * Conta de 0 até o número contido em `valor`, uma única vez, ao entrar na
 * viewport. Prefixo (+) e sufixo (%) são preservados.
 *
 * Porte do `<Counter>` de `lp-adv`. Usa requestAnimationFrame (não
 * setInterval) e respeita `prefers-reduced-motion` mostrando o valor final
 * direto — em aba oculta o rAF não roda, então o mesmo atalho vale ali.
 */
export function Contador({ valor, duracao = 1800, atraso = 0, className }: Props) {
  const alvo = Number.parseInt(valor.replace(/\D/g, ''), 10) || 0;
  const sufixo = valor.replace(/[\d\s]/g, '');
  const ehPrefixo = sufixo === '+';

  const ref = useRef<HTMLSpanElement>(null);
  const [mostrado, setMostrado] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzido || typeof IntersectionObserver === 'undefined') {
      setMostrado(alvo);
      return;
    }

    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;

    const rodar = () => {
      if (document.hidden) {
        setMostrado(alvo);
        return;
      }

      const inicio = performance.now();
      const passo = (agora: number) => {
        const progresso = Math.min(1, (agora - inicio) / duracao);
        // easeOutExpo: o número desacelera em vez de parar seco.
        const eased = progresso === 1 ? 1 : 1 - Math.pow(2, -10 * progresso);
        setMostrado(Math.floor(alvo * eased));
        if (progresso < 1) raf = requestAnimationFrame(passo);
        else setMostrado(alvo);
      };
      raf = requestAnimationFrame(passo);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.disconnect();
            timer = setTimeout(rodar, atraso);
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [alvo, duracao, atraso]);

  return (
    <span ref={ref} className={className}>
      {ehPrefixo ? `+${mostrado}` : `${mostrado}${sufixo}`}
    </span>
  );
}
