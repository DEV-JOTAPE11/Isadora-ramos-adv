/**
 * Contrato de classes entre o `<CarrosselMobile>` e quem renderiza os slides.
 *
 * Mora aqui, e não dentro do componente, porque `CarrosselMobile` é um módulo
 * `'use client'`: um valor exportado de lá e importado por um Server Component
 * não chega como string, chega como referência de cliente. O `className` do
 * slide viraria o código-fonte de um stub — sem largura, sem `shrink-0`, e o
 * carrossel silenciosamente vira uma fileira de cards espremidos.
 *
 * Um módulo sem diretiva pode ser importado pelos dois lados, e a string é
 * apenas uma string.
 */

/**
 * Cada slide precisa disto.
 *
 * `82vw` deixa o próximo card espiando pela direita — é o que denuncia que a
 * lista continua, sem precisar de seta ou instrução. O `max-w` segura o
 * tamanho em telas grandes de celular, onde 82vw já seria largo demais para
 * caber junto com a espiada.
 *
 * A partir de `sm` tudo é neutralizado e o item volta a ser uma célula de
 * grade comum.
 */
export const SLIDE_CARROSSEL =
  'w-[82vw] max-w-[330px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink';
