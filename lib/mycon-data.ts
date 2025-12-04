// lib/mycon-data.ts
// BASE DE CONHECIMENTO OFICIAL MYCON (Extraída do PDF oficial)

// ============================================================================
// 1. INFORMAÇÕES INSTITUCIONAIS
// ============================================================================

export const INSTITUCIONAL = {
  quem_somos: `O Mycon é uma administradora de consórcios 100% digital. Sem agências físicas e sem comissões de vendedores, oferecemos a menor taxa do Brasil: a partir de 9,99% total do período.

Somos administrados pela COIMEX ADMINISTRADORA DE CONSÓRCIOS S.A. (CNPJ: 27.268.770/0001-76).`,

  seguranca: `Segurança total garantida:
• Fiscalizados e autorizados pelo Banco Central do Brasil (Certificado nº 03.00.010.91)
• Seu dinheiro é protegido pela Lei 11.795 (separado do patrimônio da administradora)
• Mais de 8 milhões de brasileiros confiam no sistema de consórcios

É um investimento seguro e a forma mais econômica de conquistar seus objetivos.`,

  grupos_999: `Diferencial exclusivo: Nossos grupos têm no máximo 999 participantes.

Isso é muito menos que a média do mercado, o que aumenta matematicamente suas chances de ser contemplado mais rápido (menos concorrência nos sorteios).`,

  taxas_diferenciais: `• Taxa administrativa: A partir de 9,99% total (menor do Brasil)
• 100% digital (economia repassada para você)
• Sem comissões de vendedores
• Primeira parcela: PIX, Cartão ou Boleto`,
}

// ============================================================================
// 2. PRODUTOS DISPONÍVEIS
// ============================================================================

export const PRODUTOS = {
  imoveis: {
    descricao: `Consórcio para compra de imóvel novo, usado, na planta, terrenos, construção ou reforma.`,
    prazo: 'Até 240 meses',
    credito_maximo: 'R$ 700 mil por cota',
    credito_maior: 'Pode somar cotas (ex: 2 de R$ 400k = R$ 800k total)',
    vantagens: [
      'Sem juros, só taxa administrativa',
      'Carta = dinheiro à vista (poder de negociação)',
      'Pode usar FGTS',
      'Contemplação por sorteio ou lance'
    ]
  },

  veiculos: {
    descricao: 'Carros novos ou seminovos de qualquer marca.',
    detalhes: 'Sem juros e sem entrada. Não é empréstimo nem financiamento.',
    vantagens: [
      'Qualquer marca/modelo',
      'Parcelas que cabem no orçamento',
      'Lance embutido para acelerar'
    ]
  },

  motos: {
    descricao: 'Motos novas ou seminovas, nacionais ou importadas.',
    uso: 'Ideal para trocar ou aumentar frota.',
    vantagens: [
      'Qualquer marca (nacional ou importada)',
      'Sem juros',
      'Contemplação rápida com lance'
    ]
  },

  servicos: {
    descricao: 'A categoria mais ampla e versátil.',
    exemplos: [
      'Festas e casamentos',
      'Viagens',
      'Cirurgias plásticas',
      'Estudos e formaturas',
      'Qualquer tipo de serviço'
    ]
  },

  pesados: {
    descricao: 'Para caminhões, tratores, máquinas agrícolas e equipamentos.',
    uso: 'Ideal para renovar ou aumentar frota/maquinário.',
    vantagens: [
      'Sem juros',
      'Parcelas acessíveis',
      'Qualquer marca/modelo'
    ]
  }
}

// ============================================================================
// 3. CUSTOS E TAXAS
// ============================================================================

export const CUSTOS = {
  taxa_administrativa: {
    valor: 'A partir de 9,99% total',
    caracteristica: 'Diluída durante todo o prazo',
    diferencial: 'Menor taxa do Brasil'
  },

  taxas_contemplacao: {
    aviso: 'Cobradas apenas quando for contemplado:',
    valores: {
      analise_credito: 'R$ 400,00',
      formalizacao_auto_moto: 'R$ 550,00',
      emissao_contrato_imovel: 'R$ 800,00',
      avaliacao_imovel: 'Até 1% do valor do crédito',
      substituicao_garantia: '1% do valor atualizado'
    },
    nota: '*Valores sujeitos a atualização'
  },

  taxas_transferencia: {
    auto_moto_servico: '1% do valor atualizado',
    imovel: '0,5% do valor atualizado',
    nota: '*Valores sujeitos a atualização'
  }
}

// ============================================================================
// 4. COMO FUNCIONA
// ============================================================================

export const PROCESSO = {
  como_comprar: {
    tempo: 'Menos de 3 minutos',
    passos: [
      '1. Informe o valor do crédito desejado',
      '2. Mycon mostra os planos (prazos e parcelas)',
      '3. Escolha o plano ideal',
      '4. Pague a 1ª parcela online (PIX, Cartão ou Boleto)',
      '5. Baixe o App e gerencie tudo digitalmente'
    ]
  },

  assembleias_sorteios: {
    frequencia: 'Mensais',
    base: 'Sorteio pela Loteria Federal',
    participacao: 'Quem está com parcelas em dia',
    contemplacoes: 'Pelo menos 1 por mês (pode ter mais com lances)',
    acompanhamento: 'Pelo App Mycon'
  },

  grupos: {
    tamanho: 'Até 999 participantes (máximo)',
    diferencial: 'Muito menor que média do mercado',
    duracao: 'Prazo determinado',
    finalizacao: 'Após pagamento da última parcela'
  }
}

// ============================================================================
// 5. LANCES (ESTRATÉGIA CHAVE!)
// ============================================================================

export const LANCES = {
  lance_fixo: {
    definicao: 'Percentual determinado pela administradora',
    percentual_tipico: '20% a 30%',
    desempate: 'Cota mais próxima do número sorteado',
    pode_usar_embutido: true
  },

  lance_livre: {
    definicao: 'Oferta aberta, maior percentual vence',
    minimo: '10%',
    funcionamento: 'Como um leilão',
    pode_usar_embutido: true
  },

  lance_embutido: {
    definicao: 'Usa PARTE DA PRÓPRIA carta de crédito para pagar o lance',
    vantagem: 'NÃO tira dinheiro do bolso',
    funcionamento: 'Recebe valor líquido menor na contemplação',
    exemplo: 'Carta R$ 50k + lance embutido 30% = Recebe R$ 35k líquido',
    uso_estrategico: 'Solução perfeita para quem acha que "consórcio demora muito"'
  },

  regras_gerais: {
    sigilo: 'Ninguém vê o lance do outro',
    onde_ofertar: 'Pelo App, antes da assembleia',
    pagamento: 'Só paga se ganhar',
    visualizacao: 'Detalhes no App após aquisição'
  }
}

// ============================================================================
// 6. REAJUSTE ANUAL
// ============================================================================

export const REAJUSTE = {
  existe: true,
  frequencia: 'Anual',

  indices: {
    imoveis: 'INCC (Índice Nacional de Custo de Construção)',
    veiculos_outros: 'IPCA (Índice de Preços ao Consumidor)'
  },

  quem_sofre_reajuste: [
    'Participantes NÃO contemplados (crédito + parcelas)',
    'Participantes JÁ contemplados (parcelas)'
  ],

  motivo: `Garantir que seu crédito compre o bem no futuro, mesmo se o preço subir. 
É necessário para manter o poder de compra e o saldo do grupo.

Não é "aumento", pois o crédito também aumenta.`,
}

// ============================================================================
// 7. CONTEMPLAÇÃO
// ============================================================================

export const CONTEMPLACAO = {
  chances: {
    antes_metade_prazo: '68%',
    depois_metade_prazo: '32%',
    contemplacoes_mensais: '2 ou mais (sorteio + lances)'
  },

  processo_pos_contemplacao: [
    '1. Passar por aprovação de cadastro',
    '2. Apresentar documentação do bem',
    '3. Processo de avaliação (exigência BACEN)',
    '4. Liberação do crédito',
    '5. Comprar o bem (carta = dinheiro à vista)',
    '6. Imóvel fica alienado à Mycon',
    '7. Continuar pagando parcelas normalmente'
  ],

  poder_negociacao: 'Carta de crédito = dinheiro à vista. Você tem maior poder de negociação na compra.',

  garantias: 'Aprovação de cadastro e garantias são exigências do Banco Central para proteger os demais participantes do grupo.'
}

// ============================================================================
// 8. INADIMPLÊNCIA
// ============================================================================

export const INADIMPLENCIA = {
  regra: 'Atraso de mais de 02 meses = cancelamento da cota',

  o_que_acontece: [
    'Você NÃO perde o dinheiro!',
    'Continua concorrendo a sorteios mensais de cotas canceladas',
    'Se contemplado: recebe valor pago (com deduções contratuais)',
    'Se não sorteado: recebe no encerramento do grupo'
  ],

  renegociacao: 'Mycon ajuda a renegociar débitos para evitar cancelamento.',

  mensagem_chave: 'Fique tranquilo, estamos aqui para ajudar você a não perder suas conquistas.'
}

// ============================================================================
// 9. FGTS
// ============================================================================

export const FGTS = {
  pode_usar: true,

  usos_permitidos: [
    'Ofertar lances',
    'Complementar valor da carta na compra de imóvel',
    'Amortizar saldo devedor (após contemplado)',
    'Quitar saldo devedor (seguindo regras da Caixa)'
  ],

  regras: 'Seguir restrições da Caixa Econômica Federal',

  suporte: 'Entre em contato com nosso time de especialistas para orientação sobre uso do FGTS.'
}

// ============================================================================
// 10. VENDA DE COTA
// ============================================================================

export const VENDA_COTA = {
  em_andamento: {
    pode: true,
    condicoes: [
      'Cota ativa e em dia',
      'Transferir para outra pessoa',
      'Prévia autorização da administradora',
      'Novo participante passa por aprovação'
    ]
  },

  contemplada: {
    pode: true,
    agio: 'Até 30% sobre o valor do crédito',
    plataforma: 'MyCotas (www.mycotas.com.br)',
    descricao_mycotas: 'Único marketplace oficial para compra e venda de cotas contempladas Mycon',
    transacao: 'Entre as partes, sem interferência da administradora',
    vantagem: 'Liquidez + possibilidade de lucro'
  }
}

// ============================================================================
// 11. QUITAR FINANCIAMENTO COM CONSÓRCIO
// ============================================================================

export const QUITAR_FINANCIAMENTO = {
  pode: true,

  funcionamento: 'Usar crédito contemplado (sorteio ou lance) para quitar financiamento bancário',

  vantagem: `Trocar juros altos do financiamento (25-35 anos) pela baixa taxa administrativa do Mycon.

Economia gigante: Quitar antecipado gera abatimento proporcional dos juros.`,

  taxa_mycon: 'A partir de 0,06% ao mês (plano imóvel 180x, taxa total 11,99%)',

  condicao: 'Contratos (financiamento + consórcio) devem ser do mesmo titular',

  mensagem: 'Grande jogada financeira para quem tem financiamento ativo!'
}

// ============================================================================
// 12. ARTIGOS DO BLOG
// ============================================================================

export const BLOG_ARTICLES = [
  {
    titulo: 'Consórcio vs Financiamento: A Verdade dos Números',
    url: 'https://blog.mycon.com/consorcio-vs-financiamento',
    categoria: 'Comparação',
    tags: ['comparacao', 'financiamento', 'economia', 'juros'],
    snippet: 'Veja a diferença real entre pagar juros bancários vs taxa administrativa. Economia de até 50%!'
  },
  {
    titulo: 'Lance Embutido: Como Funciona e Quando Usar',
    url: 'https://blog.mycon.com/lance-embutido',
    categoria: 'Estratégias',
    tags: ['lance', 'embutido', 'contemplacao', 'estrategia'],
    snippet: 'Use a própria carta para ser contemplado sem tirar dinheiro do bolso. A estratégia mais inteligente.'
  },
  {
    titulo: 'MyCotas: Venda sua Cota com Lucro',
    url: 'https://www.mycotas.com.br',
    categoria: 'Marketplace',
    tags: ['venda', 'cota', 'lucro', 'mycotas', 'agio'],
    snippet: 'Marketplace oficial Mycon. Venda sua cota contemplada com segurança e lucro de até 30%.'
  },
  {
    titulo: 'Quanto Tempo Demora para Ser Contemplado?',
    url: 'https://blog.mycon.com/tempo-contemplacao',
    categoria: 'FAQ',
    tags: ['contemplacao', 'tempo', 'sorteio', 'prazo', 'estatisticas'],
    snippet: '68% são contemplados antes da metade do prazo. Entenda as estatísticas reais.'
  },
  {
    titulo: 'Como Usar FGTS no Consórcio de Imóvel',
    url: 'https://blog.mycon.com/fgts-consorcio',
    categoria: 'Imóveis',
    tags: ['fgts', 'imovel', 'como-usar', 'regras'],
    snippet: 'Guia completo: lance, complementação ou amortização. Saiba como usar seu FGTS.'
  },
  {
    titulo: 'Quitar Financiamento com Consórcio: Vale a Pena?',
    url: 'https://blog.mycon.com/quitar-financiamento',
    categoria: 'Estratégias',
    tags: ['financiamento', 'quitacao', 'economia', 'imovel'],
    snippet: 'Troque 30 anos de juros por taxa administrativa. Economia de centenas de milhares.'
  }
]

// ============================================================================
// 13. FUNÇÕES AUXILIARES
// ============================================================================

export function findRelevantArticles(query: string, limit = 2) {
  const lowerQuery = query.toLowerCase()

  const scored = BLOG_ARTICLES.map(article => {
    let score = 0

    score += article.tags.filter(tag =>
      lowerQuery.includes(tag) || tag.includes(lowerQuery.split(' ')[0])
    ).length * 3

    const titleWords = article.titulo.toLowerCase().split(' ')
    score += titleWords.filter(word =>
      word.length > 3 && lowerQuery.includes(word)
    ).length * 2

    if (article.snippet.toLowerCase().includes(lowerQuery)) score += 1

    return { article, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.article)
}

export function detectIntent(message: string): string {
  const lower = message.toLowerCase()

  if (lower.match(/seguro|confiavel|golpe|bacen|cnpj|autoriza/))
    return 'institucional_seguranca'

  if (lower.match(/taxa|custo|pagar|quanto custa|valor|preco|400|550|800/))
    return 'duvida_custos'

  if (lower.match(/lance|fixo|livre|embutido|antecipar|contempla/))
    return 'duvida_lance'

  if (lower.match(/fgts|fundo de garantia/))
    return 'duvida_fgts'

  if (lower.match(/atras|cancel|desistir|nao pagar|inadimplen/))
    return 'duvida_inadimplencia'

  if (lower.match(/vender|transferir|mycotas|agio|lucro/))
    return 'duvida_venda'

  if (lower.match(/quitar|financiamento|troca|divida/))
    return 'duvida_quitacao'

  if (lower.match(/reajust|incc|ipca|correcao|aument/))
    return 'duvida_reajuste'

  if (lower.match(/imovel|casa|apartamento|terreno|construc|reforma/))
    return 'produto_imovel'
  if (lower.match(/carro|veiculo|automovel/))
    return 'produto_veiculo'
  if (lower.match(/moto|motocicleta/))
    return 'produto_moto'
  if (lower.match(/caminhao|trator|maquina|equipamento/))
    return 'produto_pesado'
  if (lower.match(/servico|festa|casamento|viagem|cirurgia|estudo/))
    return 'produto_servico'

  if (lower.match(/simular|calcular|parcela/) || /\d{3,}/.test(lower))
    return 'simulacao'

  if (lower.match(/humano|pessoa|atendente|falar com|consultor|zap|whats/))
    return 'contato'

  if (lower.match(/como funciona|o que e|explica|entender/))
    return 'conceito_basico'

  return 'geral'
}

export function calculateLeadScore(message: string, intent: string): number {
  let score = 3
  const lower = message.toLowerCase()

  if (intent === 'contato') score += 5
  if (lower.match(/quero contratar|quero comprar|fechar negocio/)) score += 4

  if (intent === 'simulacao') score += 3
  if (lower.match(/quanto fica|qual parcela|valor de/)) score += 2

  if (intent === 'duvida_lance') score += 2
  if (lower.match(/vale a pena|vantagem|economia/)) score += 1

  if (/\d{3,}/.test(lower)) score += 2

  return Math.min(score, 10)
}
