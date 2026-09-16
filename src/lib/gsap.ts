'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Ponto único de registro do GSAP — importe daqui, nunca de "gsap" direto,
 * para garantir que o ScrollTrigger esteja registrado antes do primeiro uso.
 *
 * Mesmo arranjo do projeto `almeida-imports-site`.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
