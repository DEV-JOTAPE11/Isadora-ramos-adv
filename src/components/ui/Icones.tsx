import type { SVGProps } from 'react';

/**
 * Ícones desenhados para a página — traço de 1.5px, caixa de 24, sem
 * preenchimento, para casar com o `lucide-react` usado no resto do site.
 *
 * Um por pilar da seção "Por que escolher" e um por área de atuação, para que
 * cada card tenha um símbolo próprio em vez de repetir a balança.
 */

type Props = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/* ── pilares ─────────────────────────────────────────────────────────── */

/** Atendimento personalizado: uma pessoa e um traço de diálogo. */
export function IconePersonalizado(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.2 20a5.8 5.8 0 0 1 11.6 0" />
      <path d="M15.5 4.5h5.3v4.2h-2.1L16.6 11V8.7h-1.1z" />
    </svg>
  );
}

/** Atuação: nós interligados — várias áreas, um só atendimento. */
export function IconeAtuacao(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="17.5" r="2.2" />
      <circle cx="19" cy="17.5" r="2.2" />
      <path d="M10.4 6.8 6.4 15.4M13.6 6.8l4 8.6M7.2 17.5h9.6" />
    </svg>
  );
}

/** Assessoria: pasta de processo com um documento em destaque. */
export function IconeAssessoria(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h3.6l1.6 2h8.3a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z" />
      <path d="M8.5 12.5h7M8.5 15.5h4.5" />
    </svg>
  );
}

/** Consultoria: escudo — prevenção, o risco que não chega a virar processo. */
export function IconeConsultoria(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2 19 6v5.4c0 4-2.9 7.6-7 9.4-4.1-1.8-7-5.4-7-9.4V6z" />
      <path d="m9.2 11.9 2 2 3.6-3.9" />
    </svg>
  );
}

export const ICONES_PILAR = {
  personalizado: IconePersonalizado,
  atuacao: IconeAtuacao,
  assessoria: IconeAssessoria,
  consultoria: IconeConsultoria,
} as const;

/* ── áreas de atuação ────────────────────────────────────────────────── */

/** Previdenciário: guarda-chuva sobre a linha do tempo da contribuição. */
export function IconePrevidenciario(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.6 12.4a8.4 8.4 0 0 1 16.8 0z" />
      <path d="M12 12.4v6.1a2 2 0 0 1-4 0" />
      <path d="M12 4v-.9" />
    </svg>
  );
}

/** Família: duas figuras adultas e uma criança. */
export function IconeFamilia(props: Props) {
  return (
    <svg {...base} {...props}>
      <circle cx="7.5" cy="6.8" r="2.4" />
      <circle cx="16.5" cy="6.8" r="2.4" />
      <path d="M3.4 19v-1.6a4.1 4.1 0 0 1 8.2 0V19M12.4 19v-1.6a4.1 4.1 0 0 1 8.2 0V19" />
    </svg>
  );
}

/** Sucessório: árvore genealógica. */
export function IconeSucessorio(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="9.4" y="3.2" width="5.2" height="4" rx="1" />
      <rect x="3.4" y="16.8" width="5.2" height="4" rx="1" />
      <rect x="15.4" y="16.8" width="5.2" height="4" rx="1" />
      <path d="M12 7.2v4.4M6 16.8v-2.6h12v2.6" />
    </svg>
  );
}

/** Imobiliário: casa com a chave da escritura. */
export function IconeImobiliario(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.6 10.4 12 4l8.4 6.4V19a1.4 1.4 0 0 1-1.4 1.4H5A1.4 1.4 0 0 1 3.6 19z" />
      <circle cx="12" cy="13.2" r="1.7" />
      <path d="M12 14.9v3.1M12.9 16.7h-1.8" />
    </svg>
  );
}

/** Cível: aperto de mãos — obrigações e contratos. */
export function IconeCivel(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M2.8 10.2 6 7.4l3.4 2.9 2.2-.8 2.4 2.1" />
      <path d="M21.2 10.2 18 7.4l-3.2 2.8" />
      <path d="M9.4 10.3 7 12.7a1.6 1.6 0 0 0 2.3 2.3l.6-.6 1.3 1.3a1.5 1.5 0 0 0 2.2-2l1 1a1.5 1.5 0 0 0 2.2-2.1l-2.6-2.4" />
    </svg>
  );
}

/** Tributário: documento fiscal com percentual. */
export function IconeTributario(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M5.4 3.6h9l4.2 4.2v12.6H5.4z" />
      <path d="M14.4 3.6v4.2h4.2" />
      <path d="m9.2 16.6 5-5" />
      <circle cx="9.5" cy="11.9" r=".9" />
      <circle cx="14.4" cy="16.3" r=".9" />
    </svg>
  );
}

/** Empresarial: prédio comercial. */
export function IconeEmpresarial(props: Props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20.4V6.2a1.4 1.4 0 0 1 1.4-1.4h6.2A1.4 1.4 0 0 1 13 6.2v14.2" />
      <path d="M13 10.4h5.6a1.4 1.4 0 0 1 1.4 1.4v8.6" />
      <path d="M2.8 20.4h18.4M7 8.4h3M7 12h3M7 15.6h3M16 14h1.2M16 17.4h1.2" />
    </svg>
  );
}

export const ICONES_AREA = {
  previdenciario: IconePrevidenciario,
  familia: IconeFamilia,
  sucessorio: IconeSucessorio,
  imobiliario: IconeImobiliario,
  civel: IconeCivel,
  tributario: IconeTributario,
  empresarial: IconeEmpresarial,
} as const;

/* ── redes / contato ─────────────────────────────────────────────────── */

/** WhatsApp — glifo oficial, preenchido (não é ícone de traço). */
export function IconeWhatsApp(props: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.27-1.38a9.87 9.87 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24" />
    </svg>
  );
}

/** Instagram — traço, casa com os demais. */
export function IconeInstagram(props: Props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
