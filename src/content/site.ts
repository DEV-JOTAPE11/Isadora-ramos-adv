/**
 * Fonte única de todo o conteúdo textual e de configuração da landing page.
 *
 * ORIGEM DOS DADOS
 * - https://isadoraramos.adv.br/ — biografia, áreas de atuação, pilares de
 *   atendimento, telefone, e-mail e endereço (textos copiados literalmente).
 * - https://www.instagram.com/isadoraramosadv/ — nome completo, bio
 *   ("Excelência e ética na defesa de cada causa!"), link de WhatsApp e a
 *   área extra "Empresarial", que não aparece no site.
 *
 * Nada aqui foi inventado. Onde um texto foi escrito de novo (headline do
 * hero, FAQ, seção de compromissos), há um comentário dizendo isso — para que
 * a Dra. Isadora possa revisar antes de publicar.
 */

// ─────────────────────────────────────────────────────────── configuração

export const config = {
  /**
   * O site original tem uma seção de depoimentos com texto "Lorem ipsum" e
   * autor "John Doe" — ou seja, o template nunca foi preenchido. Inventar
   * depoimentos de clientes reais seria propaganda enganosa (e infração ao
   * Provimento 205/2021 da OAB), então a seção sai do ar até existirem
   * avaliações verdadeiras. Em seu lugar entra `Compromissos`.
   *
   * Para ligar: preencha `depoimentos` abaixo com avaliações reais (Google,
   * por exemplo) e mude esta flag para `true`.
   */
  exibirDepoimentos: false,

  /** Header fixo com blur ao rolar. */
  headerFixo: true,
} as const;

// ─────────────────────────────────────────────────────────── contato

const WHATSAPP_NUMERO = '553899759300';

const msg = (texto: string) => `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;

export const contato = {
  telefoneExibicao: '(38) 99975-9300',
  telefoneE164: '+553899759300',
  email: 'contato@isadoraramos.adv.br',

  endereco: {
    linha: 'Rua José Gomes Viana, 1520, Sala 02',
    bairro: 'Centro',
    cidade: 'Arinos',
    uf: 'MG',
    cep: '38680-000',
    pais: 'BR',
  },

  /** Mesmo link que está na bio do Instagram. */
  whatsapp: `https://wa.me/${WHATSAPP_NUMERO}`,

  /** CTA principal — abre o WhatsApp com a mensagem já escrita. */
  whatsappAgendar: msg('Olá, Dra. Isadora. Vim pelo site e gostaria de agendar uma consulta.'),

  /** CTA dos cards de área de atuação. */
  whatsappArea: (area: string) =>
    msg(`Olá, Dra. Isadora. Vim pelo site e preciso de orientação em ${area}.`),

  instagram: 'https://www.instagram.com/isadoraramosadv/',
  site: 'https://isadoraramos.adv.br/',
} as const;

export const mapsEmbed =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent('Rua José Gomes Viana, 1520, Centro, Arinos, MG, 38680-000') +
  '&t=m&z=15&output=embed&iwloc=near';

// ─────────────────────────────────────────────────────────── identidade

export const marca = {
  advogada: 'Isadora Almeida Ramos',
  tratamento: 'Dra. Isadora Ramos',
  escritorio: 'Isadora Ramos Advocacia e Consultoria Jurídica',
  nomeCurto: 'Isadora Ramos',
  oab: 'OAB/MG 238.197',
  /** Bio do Instagram, literal. */
  tagline: 'Excelência e ética na defesa de cada causa',
} as const;

export const seo = {
  titulo: 'Isadora Ramos Advocacia e Consultoria Jurídica | Arinos/MG',
  descricao:
    'Dra. Isadora Ramos (OAB/MG 238.197) — advocacia e consultoria jurídica em ' +
    'Arinos/MG. Atuação em Direito Previdenciário, de Família, Sucessório, ' +
    'Imobiliário, Cível, Tributário e Empresarial. Atendimento presencial e online.',
  canonical: 'https://isadoraramos.adv.br/',
  ogImage: '/images/isadora-retrato.webp',
} as const;

// ─────────────────────────────────────────────────────────── navegação

export type ItemNav = { rotulo: string; href: string };

export const navegacao: ItemNav[] = [
  { rotulo: 'Início', href: '#inicio' },
  { rotulo: 'Atuação', href: '#atuacao' },
  { rotulo: 'Quem sou', href: '#sobre' },
  { rotulo: 'Como trabalho', href: '#processo' },
  { rotulo: 'Dúvidas', href: '#faq' },
  { rotulo: 'Contato', href: '#contato' },
];

// ─────────────────────────────────────────────────────────── hero

export const hero = {
  /** Sobrelinha nova, escrita para dar contexto geográfico logo de saída. */
  sobrelinha: 'Advocacia e Consultoria Jurídica · Arinos/MG',
  /**
   * Headline escrita a partir do slogan do site
   * ("UM ESCRITÓRIO ESPECIALIZADO EM ASSESSORIA JURÍDICA MULTIDISCIPLINAR").
   */
  tituloLinha1: 'Assessoria jurídica',
  tituloLinha2: 'multidisciplinar',
  /** Literal do site. */
  paragrafo:
    'Serviço jurídico de Alto Padrão, Diferenciado, Honesto e Comprometido com ' +
    'nossos clientes. Cada demanda é conduzida com rigor técnico, visão prática ' +
    'e dedicação exclusiva.',
  cta: 'Falar com a advogada',
  ctaSecundario: 'Ver áreas de atuação',
  legenda: 'Atendimento presencial em Arinos/MG e online para todo o Brasil.',
} as const;

/** Números verificáveis — nada de "casos ganhos" ou taxa de êxito (vedado pela OAB). */
export const indicadores = [
  { valor: '7', linha1: 'áreas do', linha2: 'Direito' },
  { valor: '5', linha1: 'anos de', linha2: 'formação' },
  { valor: '100%', linha1: 'atendimento', linha2: 'personalizado' },
] as const;

// ─────────────────────────────────────────────────────────── incerteza

/** Card "Quando a Incerteza Encontra o Direito" — porte do projeto `alecsandra-resende-adv`. */
export const incerteza = {
  titulo: 'Quando a Incerteza',
  tituloDestaque: 'Encontra o Direito',
  paragrafo:
    'Resolver uma questão jurídica pode ser uma jornada repleta de dúvidas e ' +
    'incertezas, afetando sua segurança financeira, seu patrimônio e o bem-estar ' +
    'da sua família. É nesse momento, entre o desânimo e a esperança, que muitos ' +
    'chegam até nós. No escritório Isadora Ramos, transformamos desafios em ' +
    'conquistas, guiando você com empatia e determinação rumo à solução que ' +
    'merece. Porque aqui, sua história é nossa causa e o seu direito, nosso ' +
    'compromisso.',
} as const;

// ─────────────────────────────────────────────────────────── abertura

export const abertura = {
  titulo: 'Quando a dúvida encontra o Direito',
  /**
   * Parágrafo montado a partir de duas frases literais da biografia do site:
   * "A advocacia não se resume a processos..." e "A missão do meu escritório...".
   */
  paragrafo:
    'A advocacia não se resume a processos. Ela se faz presente nas vidas, nas ' +
    'histórias e na busca pela justiça. A missão do meu escritório é oferecer ' +
    'assessoria jurídica eficiente, garantindo que empresas e pessoas físicas ' +
    'tenham não apenas a defesa de seus direitos, mas também suporte para ' +
    'prevenir litígios e tomar decisões seguras.',
  assinatura: marca.tratamento,
  assinaturaOab: marca.oab,
} as const;

// ─────────────────────────────────────────────────────────── áreas de atuação

export type Area = {
  slug: string;
  titulo: string;
  /** Descrição literal do site isadoraramos.adv.br. */
  texto: string;
  /** Exemplos práticos — escritos para a landing, a partir de cada descrição. */
  exemplos: string[];
  href: string;
};

export const atuacao = {
  sobrelinha: 'Atuação',
  titulo: 'Áreas de',
  tituloDestaque: 'atendimento',
  paragrafo:
    'Atuação em diversas áreas do Direito, de forma interativa e integrada, ' +
    'priorizando as informações necessárias com a máxima agilidade e precisão.',
  areas: [
    {
      slug: 'previdenciario',
      titulo: 'Direito Previdenciário',
      texto:
        'Atua na proteção dos direitos dos segurados da Previdência Social, ' +
        'abrangendo aposentadorias, pensões e benefícios por incapacidade.',
      exemplos: [
        'Aposentadorias',
        'Pensão por morte',
        'Benefício por incapacidade',
        'Salário-maternidade',
      ],
      href: 'https://isadoraramos.adv.br/direito-previdenciario/',
    },
    {
      slug: 'familia',
      titulo: 'Direito de Família',
      texto:
        'Regula as relações familiares, incluindo casamento, união estável, ' +
        'divórcio, guarda de filhos e pensão alimentícia.',
      exemplos: ['Divórcio', 'União estável', 'Guarda e convivência', 'Pensão alimentícia'],
      href: 'https://isadoraramos.adv.br/direito-de-familia/',
    },
    {
      slug: 'sucessorio',
      titulo: 'Direito Sucessório',
      texto:
        'Trata da transmissão de bens, direitos e obrigações após o falecimento, ' +
        'assegurando a correta partilha entre herdeiros.',
      exemplos: ['Inventário', 'Partilha de bens', 'Testamento', 'Planejamento sucessório'],
      href: 'https://isadoraramos.adv.br/direito-sucessorio/',
    },
    {
      slug: 'imobiliario',
      titulo: 'Direito Imobiliário',
      texto:
        'Disciplina as relações jurídicas que envolvem bens imóveis, como compra ' +
        'e venda, locação, usucapião e regularização de propriedades.',
      exemplos: ['Compra e venda', 'Locação', 'Usucapião', 'Regularização urbana e rural'],
      href: 'https://isadoraramos.adv.br/direito-imobiliario-urbano-e-rural/',
    },
    {
      slug: 'civel',
      titulo: 'Direito Cível',
      texto:
        'Abrange questões relacionadas às obrigações, contratos, responsabilidade ' +
        'civil e indenizações por danos materiais ou morais.',
      exemplos: ['Contratos', 'Cobranças', 'Responsabilidade civil', 'Danos materiais e morais'],
      href: 'https://isadoraramos.adv.br/direito-civel/',
    },
    {
      slug: 'tributario',
      titulo: 'Direito Tributário',
      texto:
        'Regula a arrecadação de tributos e contribuições, bem como a defesa dos ' +
        'contribuintes contra cobranças indevidas ou excessivas.',
      exemplos: [
        'Defesa em execução fiscal',
        'Revisão de cobranças',
        'Restituição de tributos',
        'Consultoria fiscal',
      ],
      href: 'https://isadoraramos.adv.br/direito-tributario/',
    },
    {
      slug: 'empresarial',
      titulo: 'Direito Empresarial',
      /** Área declarada na bio do Instagram; sem página própria no site. */
      texto:
        'Apoio jurídico à atividade empresarial, da constituição da empresa aos ' +
        'contratos do dia a dia, com foco em prevenir litígios e dar segurança às ' +
        'decisões do negócio.',
      exemplos: [
        'Constituição de empresa',
        'Contratos comerciais',
        'Societário',
        'Consultoria preventiva',
      ],
      href: contato.whatsappArea('Direito Empresarial'),
    },
  ] satisfies Area[],
} as const;

// ─────────────────────────────────────────────────────────── sobre

export const sobre = {
  sobrelinha: 'Quem sou',
  tituloPrefixo: 'Dra. ',
  tituloDestaque: 'Isadora Ramos',
  /** Biografia literal do site. */
  paragrafos: [
    'Olá, eu sou a Dra. Isadora Ramos, advogada inscrita regularmente na OAB/MG 238.197.',
    'Sou apaixonada pelo Direito e acredito que a advocacia é mais do que resolver ' +
      'conflitos: é oferecer seriedade, ética e compromisso na busca pela justiça.',
    'Minha trajetória no Direito começou na Faculdade CNEC Unaí, onde estudei por 5 ' +
      'anos com dedicação e disciplina. Ao longo desse período, tive a oportunidade de ' +
      'estagiar no Fórum e na Promotoria de Justiça da Comarca de Arinos, bem como na ' +
      'Justiça Federal – Subseção Judiciária de Unaí. Essas experiências ' +
      'proporcionaram-me uma sólida base para atuar com segurança e excelência nas mais ' +
      'diversas áreas do Direito.',
    'Agora com meu escritório em Arinos/MG, coloco-me à disposição para oferecer um ' +
      'atendimento jurídico de confiança e excelência.',
  ],
  /** Credenciais — cada linha tem lastro na biografia. */
  credenciais: [
    { rotulo: 'Inscrição', valor: 'OAB/MG 238.197' },
    { rotulo: 'Formação', valor: 'Faculdade CNEC Unaí' },
    { rotulo: 'Estágio', valor: 'Fórum e Promotoria de Justiça de Arinos' },
    { rotulo: 'Estágio', valor: 'Justiça Federal — Subseção de Unaí' },
  ],
  cta: 'Falar com a advogada',
  citacao:
    'A advocacia não se resume a processos. Ela se faz presente nas vidas, nas ' +
    'histórias e na busca pela justiça. É por isso que escolhi trilhar este caminho.',
} as const;

// ─────────────────────────────────────────────────────────── por que escolher

export const porQue = {
  sobrelinha: 'Por que escolher',
  titulo: 'Um escritório feito para',
  tituloDestaque: 'quem precisa de respostas',
  paragrafo:
    'Cada demanda é conduzida com rigor técnico, visão prática e dedicação ' +
    'exclusiva, buscando sempre a melhor estratégia para proteger interesses e ' +
    'gerar valor ao cliente.',
  /** Os pilares abaixo são os do site; o primeiro vem de "Atendimento PERSONALIZADO". */
  pilares: [
    {
      icone: 'personalizado' as const,
      titulo: 'Atendimento personalizado',
      texto:
        'Você fala diretamente com a advogada que cuida do seu caso. Sem ' +
        'intermediários e sem juridiquês.',
    },
    {
      icone: 'atuacao' as const,
      titulo: 'Atuação',
      texto:
        'Em diversas áreas do direito, de forma interativa e integrada, ' +
        'priorizamos informações necessárias com a máxima agilidade e precisão.',
    },
    {
      icone: 'assessoria' as const,
      titulo: 'Assessoria',
      texto:
        'Baseada na compreensão da peculiaridade de cada negócio, prestamos aos ' +
        'nossos clientes o assessoramento em demandas judiciais.',
    },
    {
      icone: 'consultoria' as const,
      titulo: 'Consultoria',
      texto:
        'Atuando na parte consultiva, minimizamos os riscos judiciais oriundos ' +
        'das atividades dos nossos clientes em diversas áreas.',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────── CTA intermediário

export const ctaIntermediario = {
  titulo: 'Prazo não espera. Decisão bem tomada, também não.',
  paragrafo:
    'Antes de assinar, aceitar ou desistir de alguma coisa, vale uma conversa. ' +
    'Me chame no WhatsApp e entenda exatamente onde você está.',
  cta: 'Falar agora no WhatsApp',
} as const;

// ─────────────────────────────────────────────────────────── processo

export const processo = {
  sobrelinha: 'Como trabalho',
  titulo: 'Do primeiro contato',
  tituloDestaque: 'à solução',
  /** Etapas escritas para a landing — descrevem o fluxo de atendimento. */
  passos: [
    {
      numero: '01',
      titulo: 'Primeiro contato',
      texto:
        'Você me chama no WhatsApp e conta o que está acontecendo. Já nessa ' +
        'conversa eu digo se o caso é da minha área e o que precisamos reunir.',
    },
    {
      numero: '02',
      titulo: 'Análise do caso',
      texto:
        'Reúno os documentos e estudo a situação com rigor técnico: o que a lei ' +
        'garante, o que os tribunais vêm decidindo e quais caminhos existem.',
    },
    {
      numero: '03',
      titulo: 'Estratégia e proposta',
      texto:
        'Apresento os cenários possíveis em português claro, com riscos, prazos ' +
        'e honorários definidos por escrito antes de qualquer passo.',
    },
    {
      numero: '04',
      titulo: 'Condução e acompanhamento',
      texto:
        'Conduzo a demanda administrativa ou judicial e mantenho você informado ' +
        'a cada movimentação relevante, até a solução.',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────── compromissos

/**
 * Ocupa o lugar da seção de depoimentos enquanto não houver avaliações reais.
 * Todos os itens têm lastro em texto do site ou da bio do Instagram.
 */
export const compromissos = {
  sobrelinha: 'Compromisso',
  titulo: 'O que você pode',
  tituloDestaque: 'esperar de mim',
  itens: [
    {
      titulo: 'Ética antes de tudo',
      texto:
        'Excelência e ética na defesa de cada causa. Nenhuma promessa de ' +
        'resultado, nenhuma expectativa criada sem base.',
    },
    {
      titulo: 'Rigor técnico',
      texto:
        'Cada demanda é conduzida com rigor técnico, visão prática e dedicação ' +
        'exclusiva ao seu caso.',
    },
    {
      titulo: 'Linguagem clara',
      texto:
        'Você vai entender o que está sendo feito, por quê e o que vem depois — ' +
        'sem precisar de tradução.',
    },
    {
      titulo: 'Prevenção, não só litígio',
      texto:
        'Suporte para prevenir litígios e tomar decisões seguras, e não apenas ' +
        'para reagir quando o problema já chegou.',
    },
  ],
} as const;

/**
 * Avaliações reais de clientes. Preencha e ligue `config.exibirDepoimentos`.
 */
export type Depoimento = {
  nome: string;
  data: string;
  estrelas: number;
  texto: string;
};

export const depoimentos: Depoimento[] = [];

// ─────────────────────────────────────────────────────────── CTA final

export const ctaFinal = {
  sobrelinha: 'Vamos conversar',
  titulo: 'Conte o seu caso',
  paragrafo:
    'A primeira conversa serve para entender a sua situação e dizer, com ' +
    'honestidade, se e como posso ajudar.',
  cta: 'Falar com a advogada',
} as const;

// ─────────────────────────────────────────────────────────── FAQ

/** Perguntas escritas para a landing. Revise as respostas antes de publicar. */
export const faq = {
  sobrelinha: 'Dúvidas frequentes',
  titulo: 'Perguntas',
  tituloDestaque: 'frequentes',
  itens: [
    {
      pergunta: 'A primeira conversa tem custo?',
      resposta:
        'O primeiro contato serve para entender a sua situação e verificar se ela ' +
        'é da minha área de atuação. Se for necessário um estudo aprofundado do ' +
        'caso, eu informo antes o valor da consulta — nada é cobrado sem que você ' +
        'saiba de antemão.',
    },
    {
      pergunta: 'Você atende clientes de fora de Arinos?',
      resposta:
        'Sim. O escritório fica em Arinos/MG e atende presencialmente na região, ' +
        'mas boa parte dos atendimentos é feita de forma remota, por WhatsApp, ' +
        'videochamada e assinatura eletrônica de documentos.',
    },
    {
      pergunta: 'Quanto tempo demora um processo?',
      resposta:
        'Depende da área, da via escolhida (administrativa ou judicial) e do ' +
        'órgão responsável. Nenhum advogado pode garantir prazo ou resultado. ' +
        'O que eu faço é apresentar a estimativa realista para o seu tipo de caso ' +
        'e avisar a cada movimentação relevante.',
    },
    {
      pergunta: 'Quais documentos eu preciso separar?',
      resposta:
        'Varia conforme a área. Em geral: documento de identidade, CPF, ' +
        'comprovante de endereço e tudo o que se relacione ao caso — CNIS e ' +
        'carteira de trabalho no previdenciário, contratos e matrícula do imóvel ' +
        'no imobiliário, certidões no sucessório. No primeiro contato eu envio a ' +
        'lista exata do seu caso.',
    },
    {
      pergunta: 'Como são definidos os honorários?',
      resposta:
        'Os honorários observam a Tabela da OAB/MG e são combinados por escrito ' +
        'antes de qualquer providência, em contrato de prestação de serviços. ' +
        'Você sabe quanto, quando e por quê antes de assinar.',
    },
    {
      pergunta: 'Como faço para começar?',
      resposta:
        'Basta me chamar no WhatsApp (38) 99975-9300 e contar, em poucas linhas, ' +
        'o que está acontecendo. Eu respondo dizendo os próximos passos.',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────── rodapé

export const rodape = {
  /**
   * Aviso alinhado ao Código de Ética e Disciplina da OAB e ao Provimento
   * 205/2021: o site é informativo, não é captação de clientela.
   */
  aviso:
    'Este site tem caráter meramente informativo, em conformidade com o Código ' +
    'de Ética e Disciplina da OAB e com o Provimento nº 205/2021 do Conselho ' +
    'Federal da OAB. Não constitui oferta de serviços, captação de clientela ou ' +
    'promessa de resultado.',
} as const;
