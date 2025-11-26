// app/api/chat-mycon/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai'
import { BLOG_ARTICLES, TAXAS_CONSORCIO, SYSTEM_PROMPT } from '@/lib/mycon-data'
import { NextRequest, NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Função calcular consórcio
function calcularConsorcio(valorCarta: number, prazoMeses: number, tipo: string) {
  const taxa = TAXAS_CONSORCIO[tipo as keyof typeof TAXAS_CONSORCIO]
  const parcelaPura = valorCarta / prazoMeses
  const taxaAdmin = parcelaPura * taxa.admin
  const fundoReserva = parcelaPura * taxa.fundo
  const parcelaTotal = parcelaPura + taxaAdmin + fundoReserva
  
  const jurosMedio = tipo === 'imovel' ? 0.0099 : 0.0189
  const parcelaFinanc = (valorCarta * jurosMedio) / (1 - Math.pow(1 + jurosMedio, -prazoMeses))
  const economia = (parcelaFinanc * prazoMeses) - valorCarta
  
  return {
    valorCarta,
    prazoMeses,
    parcelaTotal: parcelaTotal.toFixed(2),
    parcelaFinanciamento: parcelaFinanc.toFixed(2),
    economia: economia.toFixed(2),
    tipo: 'calculadora'
  }
}

// Função buscar blog
function buscarBlog(topico: string) {
  const resultados = BLOG_ARTICLES.filter(article => 
    article.tags.some(tag => 
      topico.toLowerCase().includes(tag) || 
      tag.includes(topico.toLowerCase())
    )
  ).slice(0, 2)
  
  return {
    articles: resultados,
    tipo: 'blog'
  }
}

// Lead scoring
function calcularLeadScore(message: string): number {
  let score = 5
  const hotWords = ['comprar', 'contratar', 'quanto', 'parcela', 'hoje', 'agora']
  hotWords.forEach(word => {
    if (message.toLowerCase().includes(word)) score += 2
  })
  return Math.min(score, 10)
}

export async function POST(req: NextRequest) {
  const startTime = Date.now()
  const { message, history = [] } = await req.json()

  try {
    // OPÇÃO 1: SEM TOOLS (mais simples, funciona 100%)
    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    })
    
    // Prompt que instrui o modelo a responder com JSON quando necessário
    const enhancedPrompt = `
    ${SYSTEM_PROMPT}
    
    IMPORTANTE: Quando o usuário perguntar sobre valores/parcelas, responda incluindo:
    [CALCULAR:valorCarta,prazoMeses,tipo]
    
    Quando perguntar sobre assuntos do blog, inclua:
    [BLOG:topico]
    
    Mensagem do usuário: ${message}
    `
    
    const result = await model.generateContent(enhancedPrompt)
    console.log('teste')
    const responseText = result.response.text()
    
    // Processar comandos especiais na resposta
    let toolResult = null
    
    // Detectar se precisa calcular
    const calcMatch = responseText.match(/\[CALCULAR:(\d+),(\d+),(\w+)\]/)
    if (calcMatch) {
      const [_, valor, prazo, tipo] = calcMatch
      toolResult = calcularConsorcio(Number(valor), Number(prazo), tipo)
    }
    
    // Detectar se precisa buscar blog
    const blogMatch = responseText.match(/\[BLOG:(.+?)\]/)
    if (blogMatch) {
      toolResult = buscarBlog(blogMatch[1])
    }
    
    // Limpar a resposta removendo os comandos
    const cleanResponse = responseText
      .replace(/\[CALCULAR:.+?\]/g, '')
      .replace(/\[BLOG:.+?\]/g, '')
      .trim()
    
    return NextResponse.json({
      message: cleanResponse,
      toolResult,
      metadata: {
        leadScore: calcularLeadScore(message),
        responseTime: Date.now() - startTime
      }
    })
    
  } catch (error) {
    console.error('Erro:', error)
    return NextResponse.json({ 
      error: 'Erro ao processar',
      message: 'Desculpe, tive um problema. Pode repetir?'
    }, { status: 500 })
  }
}