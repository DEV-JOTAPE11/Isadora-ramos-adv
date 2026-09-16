'use client';

import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * GUARDA DE FIM DE PÁGINA para animações com `scrub`.
 *
 * Um ScrollTrigger com `scrub` amarra o progresso da animação à rolagem entre
 * `start` e `end`. Se o elemento está perto do rodapé, a página pode acabar
 * ANTES de ele chegar à posição de `end` — e aí a animação congela no meio do
 * caminho, sem nenhuma rolagem capaz de terminá-la. Num título revelado por
 * desfoque isso significa texto permanentemente ilegível.
 *
 * Esta função devolve um `onRefresh` que detecta o caso (fim previsto além do
 * scroll máximo do documento), descarta o scrub e deixa a animação rodar por
 * tempo, como uma entrada comum.
 *
 * `onRefresh` roda no cálculo inicial e a cada reflow — troca de fonte,
 * `resize`, imagem que termina de carregar —, então a checagem acompanha a
 * página em vez de valer só para a altura do primeiro paint.
 *
 * O `requestAnimationFrame` não é enfeite: matar o próprio trigger de dentro
 * do `onRefresh` dele mexe na lista que o ScrollTrigger está percorrendo
 * naquele instante. Adiar um quadro deixa o refresh terminar primeiro.
 */
export function garantirConclusaoNoFimDaPagina(
  alvos: ArrayLike<Element>,
  estadoFinal: gsap.TweenVars,
) {
  return (self: ScrollTrigger) => {
    if (self.end <= ScrollTrigger.maxScroll(window)) return;

    requestAnimationFrame(() => {
      // O contexto pode ter sido revertido entre o refresh e este quadro.
      if (!self.trigger?.isConnected) return;

      self.kill(false);
      gsap.to(alvos, estadoFinal);
    });
  };
}
