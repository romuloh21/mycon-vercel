
// Types simples e diretos
export interface Message {
  role: 'user' | 'assistant'
  content: string
  toolResult?: any
}

// Blog articles
export const BLOG_ARTICLES = [
  {
    titulo: 'Como funciona a contemplação',
    url: 'https://blog.mycon.com/contemplacao',
    tags: ['contemplação', 'sorteio']
  },
  {
    titulo: 'Consórcio vs Financiamento',
    url: 'https://blog.mycon.com/comparacao',
    tags: ['economia', 'juros']
  },
  // mais 3-5 artigos
]

// Regras de cálculo
export const TAXAS_CONSORCIO = {
  imovel: { admin: 0.15, fundo: 0.05 },
  veiculo: { admin: 0.12, fundo: 0.03 }
}

// Prompt do Gemini
export const SYSTEM_PROMPT = `
Você é um consultor da Mycon Consórcios.

FERRAMENTAS DISPONÍVEIS:
- calcular_consorcio: para simulações
- buscar_blog: para recomendar conteúdo
- lead_score: avaliar interesse do cliente

Seja direto, educativo e sempre ofereça simulações.
`
