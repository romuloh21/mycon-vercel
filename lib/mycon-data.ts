
// Types simples e diretos
// Tipos simples e diretos (mantidos)
export interface Message {
  role: 'user' | 'assistant'
  content: string
  toolResult?: any
}

// Blog articles (ESTRUTURA ATUALIZADA)
export const BLOG_ARTICLES = [
  {
    titulo: 'Como funciona um consórcio de imóveis?',
    url: 'https://blog.mycon.com/imovel-simulacao',
    categoria: 'Consórcio imobiliário', // Novo Campo
    data: '4/11/25', // Novo Campo
    tags: ['contemplação', 'imóvel'],
    image: '/login.jpg', // Usando uma imagem genérica existente
    snippet: 'Entenda como funciona um consórcio de imóveis, quais são as taxas e como simular.'
  },
  {
    titulo: 'Qual o melhor mês para dar lance em consórcio?',
    url: 'https://blog.mycon.com/melhor-mes-lance',
    categoria: 'Investir e lucrar',
    data: '31/10/25',
    tags: ['lance', 'economia'],
    snippet: 'Descubra qual é o melhor mês para dar lance em consórcio para otimizar suas chances.'
  },
  {
    titulo: 'Consórcio vs Financiamento',
    url: 'https://blog.mycon.com/comparacao',
    categoria: 'Consórcio imobiliário',
    data: '25/10/25',
    tags: ['economia', 'juros'],
    snippet: 'Veja a comparação direta entre as duas modalidades e economize milhares de reais.'
  },
   {
    titulo: 'Consórcio é o financiamento mais Barato que existe.',
    url: 'https://blog.mycon.com/o-mais-barato',
    categoria: 'Consórcio de serviços',
    data: '20/10/25',
    tags: ['serviços', 'veículo'],
    snippet: 'Saiba como o consórcio de veículos ajudou motoristas a transformarem suas carreiras.'
  },
];

// Regras de cálculo
export const TAXAS_CONSORCIO = {
  imovel: { admin: 0.15, fundo: 0.05 },
  veiculo: { admin: 0.12, fundo: 0.03 }
}

// Prompt do Gemini
export const SYSTEM_PROMPT = `
Você é o Mycon IA, um consultor financeiro sênior, experiente e educado, especializado em consórcios.
Seu tom é confiante, direto e focado em soluções que geram economia.
Você fala exclusivamente português do Brasil.

MISSÃO: Sua principal missão é converter o interesse do usuário em uma ação, seja ela a simulação ou o contato direto.
USP (Foco de Vendas): O consórcio Mycon não tem juros, apenas uma taxa de administração muito baixa, provando ser o financiamento mais BARATO do Brasil.
OBJETIVOS:
1. Desmistificar o consórcio, focando em segurança e economia.
2. Quebrar a objeção da 'demora', promovendo o Lance Embutido como acelerador.
3. Sempre que o usuário mencionar 'valor', 'parcela' ou 'simular', use a tag [CALCULAR:valorCarta,prazoMeses,tipo] antes de qualquer explicação.
4. Se o usuário perguntar sobre termos ou conceitos, use a tag [BLOG:topico] para recomendar material de leitura.
5. Nunca alucine ou invente números de juros ou taxas.

Seja conciso, entregando valor em parágrafos de no máximo 3 frases.
`

