
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { buildPromptWithHistory } from '@/lib/system-prompt'
import {
  findRelevantArticles,
  detectIntent,
  calculateLeadScore  // ← ADICIONADO
} from '@/lib/mycon-data'

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
})

// --- TOOLS (Focadas em Informação) ---
const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "buscar_blog",
      description: "Busca links de artigos para aprofundamento.",
      parameters: {
        type: "object",
        properties: { topico: { type: "string" } },
        required: ["topico"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "salvar_lead",
      description: "Salva contato para atendimento humano.",
      parameters: {
        type: "object",
        properties: { nome: { type: "string" }, contato: { type: "string" } },
        required: ["nome", "contato"]
      }
    }
  }
];

// --- EXECUTORES ---
function executarBuscaBlog({ topico }: any) {
  const artigos = findRelevantArticles(topico);
  return { tipo_tool: 'blog', dados: { termo: topico, artigos } };
}

async function executarSalvarLead({ nome, contato }: any) {
  return { tipo_tool: 'lead_capture', dados: { sucesso: true } };
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    const intent = detectIntent(message);

    // @ts-ignore
    const messages = buildPromptWithHistory(message, history);

    // 1. Chamada Groq
    const firstCall = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      // @ts-ignore
      messages: messages,
      tools: tools,
      tool_choice: "auto",
      temperature: 0.5,
      max_tokens: 1024,
    });

    const responseMsg = firstCall.choices[0].message;
    let finalContent = responseMsg.content;
    let toolResult = null;

    // 2. Processa Tools (Se houver)
    if (responseMsg.tool_calls && responseMsg.tool_calls.length > 0) {
      const toolCall = responseMsg.tool_calls[0];

      if (toolCall.type === 'function') {
        const fnName = toolCall.function.name;
        const fnArgs = JSON.parse(toolCall.function.arguments);

        console.log(`[GROQ] Executando: ${fnName}`, fnArgs);

        if (fnName === 'buscar_blog') toolResult = executarBuscaBlog(fnArgs);
        else if (fnName === 'salvar_lead') toolResult = await executarSalvarLead(fnArgs);

        // Round Trip para gerar texto explicativo
        messages.push(responseMsg);
        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult)
        });

        const secondCall = await client.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          // @ts-ignore
          messages: messages,
          temperature: 0.7,
        });

        finalContent = secondCall.choices[0].message.content;
      }
    }

    // ============================================================
    // ✨ LEAD SCORING ADICIONADO AQUI:
    // ============================================================
    const leadScore = calculateLeadScore(message, intent)
    const shouldCapture = leadScore >= 8
    // ============================================================

    return NextResponse.json({
      message: finalContent || "Entendido.",
      toolResult: toolResult,
      metadata: {
        intent,
        leadScore,        // ← NOVO
        shouldCapture     // ← NOVO
      }
    });

  } catch (error: any) {
    console.error("[GROQ ERROR]", error);
    return NextResponse.json({
      message: "Erro técnico. Tente novamente.",
      error: true
    }, { status: 500 });
  }
}
