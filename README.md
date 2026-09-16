# Isadora Ramos — Advocacia e Consultoria Jurídica

Landing page da Dra. Isadora Almeida Ramos (OAB/MG 238.197), escritório em
Arinos/MG.

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · GSAP.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

---

## De onde veio cada coisa

| Camada | Referência |
| --- | --- |
| **Estrutura das seções** | `lp-advogada/alecsandra-resende-adv` |
| **Tipografia, tokens e vocabulário de componentes** | `lp-adv` (Outfit / Inter / Cormorant Garamond, `.btn-advocacia`, `.reveal`) |
| **Animações de entrada com scrub** | `almeida-imports-site` (`BlurRevealText`, `ScrollFloat` → GSAP + ScrollTrigger) |
| **Conteúdo** | [isadoraramos.adv.br](https://isadoraramos.adv.br/) e [@isadoraramosadv](https://www.instagram.com/isadoraramosadv/) |

Todo o texto vive em **`src/content/site.ts`**, com um comentário por bloco
dizendo se ele foi copiado literalmente da fonte ou escrito para esta página.
Nada além disso precisa ser editado para mudar a cópia.

---

## A paleta

A marca da Dra. Isadora já é **verde + ouro** — dá para ver no perfil dela. Mas
o verde do Instagram é um oliva acinzentado: em tela grande ele fica pesado e
puxa a peça para o lado "militar".

Aqui ele virou uma rampa de **esmeralda** de verdade: mesma família de matiz,
croma bem mais alto no meio da escala. É o verde que combina com o dourado do
logotipo — o par esmeralda/ouro é o de encadernação jurídica antiga — e é o que
dá o ar de autoridade que o briefing pedia.

```
esmeralda-950  #05170f   ← fundo do hero, rodapé
esmeralda-800  #0d3d2b   ← CTA intermediário, botões sólidos
esmeralda-600  #167049   ← ações, hover
esmeralda-50   #eff9f4   ← superfícies claras

ouro-600       #a8812f   ← sobrelinhas sobre fundo claro
ouro-500       #c6a24b   ← bordas, filetes
ouro-400/300   #d9bc72 / #e7d3a2   ← texto de destaque sobre fundo escuro
```

Os dourados foram amostrados do próprio logotipo. Os neutros (`osso`,
`grafite`, `tinta`) não são cinzas puros: têm o matiz do esmeralda em croma
baixo, para que texto e superfícies pertençam à mesma família.

Tudo está em `@theme` no topo de `src/app/globals.css`.

---

## As animações

Duas famílias, e a escolha entre elas é de custo:

**1. `.reveal` — CSS puro + IntersectionObserver** (`src/components/ui/Revelar.tsx`)

Carrega a página inteira. Anima só `opacity` e `transform`, dispara uma vez e
desconecta o observer. É o barato, e por isso são ~30 blocos sem que a rolagem
sinta.

**2. GSAP + ScrollTrigger com `scrub`** (`src/components/effects/`)

Reservado aos títulos, onde o efeito se paga:

- `TituloDesfoque` — revela caractere a caractere saindo de `blur(10px)`.
- `TituloFlutuante` — as letras sobem esticadas e vão assentando.

Nos dois, o progresso vem da rolagem, não de um relógio.

**3. `.hero-in` — `@keyframes` disparado pela pintura**

O hero nasce na primeira dobra: não há o que observar. Isso mantém o `<Hero>`
como Server Component, sem um grama de JS.

### A guarda de fim de página

`src/lib/scrub.ts` resolve um problema real do `scrub`: se o elemento está
perto do rodapé, a página pode acabar antes de ele chegar à posição de `end` — e
a animação congela no meio, sem nenhuma rolagem capaz de terminá-la. Num título
revelado por desfoque, isso é texto permanentemente ilegível.

O `onRefresh` detecta o caso, descarta o scrub e deixa a animação rodar por
tempo. Roda de novo a cada reflow (troca de fonte, `resize`, imagem que carrega),
então a checagem acompanha a página.

### Movimento reduzido

Sob `prefers-reduced-motion: reduce` o CSS neutraliza tudo, e os componentes GSAP
nem chegam a criar os triggers.

---

## O carrossel de áreas (só no mobile)

`src/components/ui/CarrosselMobile.tsx`

Empilhados, os oito cards de "Atuação" davam mais de quatro telas de rolagem no
meio da página. Deitados numa trilha com `scroll-snap`, a seção cabe numa tela e
o gesto é o mesmo do feed do Instagram dela.

A troca é **só CSS**: o mesmo `<ul>` é `flex + overflow-x-auto + snap-x` na base
e `sm:grid` daí para cima. Nada é duplicado, nada remonta, e não há media query
em JS — então não existe o "pisca" de layout de um carrossel que só se monta
depois da hidratação. O `-mx-6 px-6` sangra a trilha até a borda da tela
mantendo o primeiro card na calha do `<Container>`, que é o que faz o próximo
card espiar pela direita.

O deslocamento é `scrollLeft` nativo, não `transform`: sai de graça a inércia do
sistema, o snap e a navegação por teclado (dar Tab para um link fora da vista
faz o navegador rolar a trilha até ele). O JS só lê `scrollLeft` para alimentar
o contador, a barra de progresso e o estado das setas.

**Duas armadilhas que valem a nota:**

1. **`SLIDE_CARROSSEL` mora em `src/lib/carrossel.ts`, não no componente.**
   `CarrosselMobile` é `'use client'`; uma string exportada de lá e importada
   por um Server Component chega como referência de cliente, não como texto — o
   `className` do slide vira o código-fonte de um stub e o carrossel
   silenciosamente vira uma fileira de cards espremidos.

2. **Dentro da trilha, quem anima é o bloco, não cada card.** O
   IntersectionObserver recorta a interseção por todo ancestral que corta
   conteúdo, e a trilha é um deles: um card fora da vista horizontal intersecta
   a viewport em 0% por mais que se alargue o `rootMargin`. Abaixo de `sm` a
   regra `.trilha-carrossel .reveal` desliga o reveal individual e a entrada
   fica por conta do `<Revelar class="reveal-so-mobile">` que envolve a trilha;
   acima de `sm` é o inverso, e a cascata card a card volta a valer. As duas
   regras estão em `globals.css`, comentadas.

---

## Decisões que valem ser conhecidas

### Os depoimentos estão desligados

O site atual tem uma seção de depoimentos preenchida com "Lorem ipsum" e
assinada por "John Doe" — o template nunca foi completado.

Publicar depoimentos inventados seria propaganda enganosa e infração ao
**Provimento nº 205/2021** do Conselho Federal da OAB. Então o componente
`<Depoimentos>` está pronto, mas desligado por `config.exibirDepoimentos`, e no
lugar dele entra `<Compromissos>` — quatro promessas com lastro em texto real do
site e da bio.

Para ligar, quando houver avaliações verdadeiras:

```ts
// src/content/site.ts
export const config = { exibirDepoimentos: true, /* … */ };

export const depoimentos: Depoimento[] = [
  { nome: '…', data: '…', estrelas: 5, texto: '…' },
];
```

O componente também tem uma guarda: com o array vazio ele não renderiza nada,
mesmo que a flag seja ligada por engano.

### Os números são todos verificáveis

Áreas atendidas, anos de formação, atendimento personalizado. Nenhum "índice de
êxito" ou "casos ganhos" — o mesmo Provimento veda esse tipo de número em
publicidade de advogado. O aviso correspondente está no rodapé.

### Não há formulário de contato

O canal real do escritório é o WhatsApp — é o link da bio e o botão principal do
site atual. Um formulário exigiria backend, tratamento de dados pessoais sob a
LGPD e alguém conferindo a caixa de entrada: três pontos de falha para substituir
um canal que já funciona. Se um dia for preciso, o lugar é
`src/components/sections/Contato.tsx`.

### As imagens dos projetos de referência foram trocadas

`alecsandra-resende-adv` trazia como fundo de seção **retratos da Dra. Alecsandra
Resende**, e `lp-adv` tinha uma arte com placa de mesa **"Dr. Marcos Polirsa"**.
Material de outro escritório não pode aparecer aqui, então todas saíram.

No lugar entraram fotos do **Pexels** (licença livre para uso comercial)
tratadas na paleta esmeralda, e uma textura procedural gerada por código. O
processo está em `scripts/preparar-imagens.mjs` — o script não faz parte do
build, ele existe como documentação de como cada arquivo foi produzido.

---

## Estrutura

```
src/
  app/
    layout.tsx          fontes, metadata, JSON-LD (Attorney)
    page.tsx            ordem das seções
    globals.css         tokens, componentes, animações
  content/site.ts       TODO o texto e a configuração
  components/
    layout/             Header, Footer
    sections/           uma por seção da página
    ui/                 Botao, Container, Acordeao, Contador, CarrosselMobile…
    effects/            TituloDesfoque, TituloFlutuante (GSAP)
  lib/
    assets.ts           catálogo de imagens com alt e procedência
    carrossel.ts        classes do slide (fora do módulo client, ver acima)
    gsap.ts             ponto único de registro do ScrollTrigger
    scrub.ts            guarda de fim de página
    utils.ts
scripts/
  preparar-imagens.mjs  como os assets foram gerados
```

Ordem das seções — a mesma do `alecsandra-resende-adv`:

```
hero → abertura → atuação → quem sou → por que → CTA →
processo → prova social → FAQ → contato → rodapé
```

A lógica é alternar bloco claro e bloco escuro, e nunca deixar mais de duas
seções entre um CTA e o próximo.

---

## SEO

- JSON-LD `Attorney` no layout, com endereço, telefone, horário e áreas — é o
  que alimenta o painel local do Google, que para um escritório de cidade
  pequena é quase toda a busca.
- JSON-LD `FAQPage` dentro da própria seção de FAQ, para que pergunta e
  marcação mudem juntas.
- `robots.ts` e `sitemap.ts` geram os arquivos a partir de `seo.canonical`.
- Favicon e apple-icon gerados do monograma sobre o esmeralda da marca.

---

## Antes de publicar

- [ ] Revisar as respostas do **FAQ** — as perguntas foram escritas para esta
      página e falam de honorários e prazos em nome do escritório.
- [ ] Trocar o **retrato** por um arquivo em alta. O atual foi recortado de uma
      arte do Instagram (`isadora-retrato.webp`, 820 px de largura); serve, mas
      uma foto original renderiza melhor em tela retina.
- [ ] Conferir o **horário de atendimento** (hoje: seg–sex, 8h–18h), que aparece
      no rodapé, na seção de contato e no JSON-LD.
- [ ] Preencher os **depoimentos** e ligar a flag, se já houver avaliações.
- [ ] Confirmar o **endereço**: o site atual escreve "Arimos/MG"; aqui está
      "Arinos/MG", que é o que consta no Instagram e é o nome correto da cidade.
